import dotenv from "dotenv";
import mongoose from "mongoose";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import Seller from "../../models/sellerModel.js";
import SellerWallet from "../../models/sellerWallet.js";
import StripeModel from "../../models/stripeModel.js";
import WithDrawRequest from "../../models/withdrawRequestModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// khởi tạo và kích hoạt tài khoản Stripe
const create_stripe_connect_account = asyncHandler(async (req, res, next) => {
        const id = req?._id;

        const uid = uuidv4();

        // Xoá stripe cũ nếu tồn tại
        const stripeInfo = await StripeModel.findOne({ sellerId: id });
        if (stripeInfo) {
                await StripeModel.deleteOne({ sellerId: id });
        }

        // Tạo tài khoản Express cho seller
        const account = await stripe.accounts.create({
                type: "express",
                country: "SG", // Singapore
                email: "test@example.com", // fake email test
                capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true },
                },
        });

        // Tạo link onboarding
        const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: `http://localhost:3001/refresh`,
                return_url: `http://localhost:3001/success?activeCode=${uid}`,
                type: "account_onboarding",
        });

        // Lưu lại thông tin Stripe account
        await StripeModel.create({ sellerId: id, stripeId: account.id, code: uid });

        res.status(200).json(
                new ApiResponse(200, "Stripe connect account created successfully", {
                        success: true,
                        url: accountLink.url,
                })
        );
});

const active_stripe_connect_account = asyncHandler(async (req, res, next) => {
        const { activeCode } = req.params;
        const id = req?._id;

        const userStripeInfo = await StripeModel.findOne({ code: activeCode });

        if (!userStripeInfo) {
                return next(new ApiError(400, "Stripe connect account not found"));
        }

        await Seller.findByIdAndUpdate(id, { payment: "active" });

        res.status(200).json(new ApiResponse(200, "Payment activated successfully", { success: true }));
});

const seller_payment_details = asyncHandler(async (req, res, next) => {
        const { sellerId } = req.params;

        const payments = await SellerWallet.find({ sellerId: new mongoose.Types.ObjectId(sellerId) });

        const pendingWithdraws = await WithDrawRequest.find({
                sellerId: new mongoose.Types.ObjectId(sellerId),
                status: "pending",
        });

        const successWithdraws = await WithDrawRequest.find({
                sellerId: new mongoose.Types.ObjectId(sellerId),
                status: "success",
        });

        const pendingAmount = pendingWithdraws.reduce((sum, cur) => sum + (cur.amount || 0), 0);
        const withdrawAmount = successWithdraws.reduce((sum, cur) => sum + (cur.amount || 0), 0);
        const totalAmount = payments.reduce((sum, cur) => sum + (cur.amount || 0), 0);

        let availableAmount = 0;
        if (totalAmount > 0) {
                availableAmount = totalAmount - pendingAmount - withdrawAmount;
        }
        res.status(200).json(
                new ApiResponse(200, "Payment details fetched successfully", {
                        payments,
                        pendingWithdraws,
                        successWithdraws,
                        pendingAmount,
                        withdrawAmount,
                        totalAmount,
                        availableAmount,
                })
        );
});

const withdraw_request = asyncHandler(async (req, res, next) => {
        const { amount, sellerId } = req.body;

        const withdraw = await WithDrawRequest.create({
                amount: parseInt(amount),
                sellerId: new mongoose.Types.ObjectId(sellerId),
        });

        if (!withdraw) {
                return next(new ApiError(400, "Withdraw request not created"));
        }
        res.status(201).json(new ApiResponse(201, "Withdraw request created successfully", { withdraw }));
});

const admin_request_payment = asyncHandler(async (req, res, next) => {
        const withdrawRequest = await WithDrawRequest.find({ status: "pending" });
        if (!withdrawRequest) {
                return next(new ApiError(400, "No withdraw request found"));
        }
        res.status(200).json(new ApiResponse(200, "", { withdrawRequest }));
});

const confirm_payment_request = asyncHandler(async (req, res, next) => {
        const { paymentId } = req.body;

        // 1. Lấy và cập nhật withdraw request
        const payment = await WithDrawRequest.findByIdAndUpdate(paymentId, { status: "success" }, { new: true });

        if (!payment) {
                return next(new ApiError(400, "Payment request not found"));
        }

        // 2. Lấy Stripe account của seller
        // const stripeModel = await StripeModel.findOne({
        //         sellerId: new mongoose.Types.ObjectId(payment.sellerId),
        // });

        // if (!stripeModel) {
        //         return next(new ApiError(400, "Stripe account not found"));
        // }

        // const stripeId = stripeModel.stripeId;

        // // 3. Lấy thông tin account từ Stripe
        // const account = await stripe.accounts.retrieve(stripeId);

        // // 4. Check capability transfers
        // if (!account.capabilities || account.capabilities.transfers !== "active") {
        //         // Tạo account link onboarding để seller hoàn tất KYC
        //         const accountLink = await stripe.accountLinks.create({
        //                 account: stripeId,
        //                 refresh_url: `http://localhost:3001/refresh`,
        //                 return_url: `http://localhost:3001/success?paymentId=${paymentId}`,
        //                 type: "account_onboarding",
        //         });

        //         return res.status(200).json(
        //                 new ApiResponse(200, "Seller is not active. Redirect to onboarding.", {
        //                         onboardingUrl: accountLink.url,
        //                         paymentId: payment._id,
        //                 })
        //         );
        // }

        // // 5. Tạo transfer nếu seller đã active
        // await stripe.transfers.create({
        //         amount: parseInt(payment.amount) * 100, // cents
        //         currency: "usd",
        //         destination: stripeId,
        // });

        res.status(200).json(new ApiResponse(200, "Payment request confirmed successfully", { payment }));
});

export default {
        create_stripe_connect_account,
        active_stripe_connect_account,
        seller_payment_details,
        withdraw_request,
        admin_request_payment,
        confirm_payment_request,
};
