import dotenv from "dotenv";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import StripeModel from "../../models/stripeModel.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export default {
        create_stripe_connect_account,
};
