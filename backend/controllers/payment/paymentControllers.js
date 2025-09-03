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

        const stripeInfo = await StripeModel.findOne({ sellerId: id });

        if (stripeInfo) {
                await StripeModel.deleteOne({ sellerId: id });
                const account = await stripe.accounts.create({ type: "express" });

                const accountLink = await stripe.accountLinks.create({
                        account: account.id,
                        refresh_url: `http://localhost:3001/refresh`,
                        return_url: `http://localhost:3001/success?activeCode=${uid}`,
                        type: "account_onboarding",
                });
                await StripeModel.create({ sellerId: id, stripeId: account.id, code: uid });

                res.status(200).json(
                        new ApiResponse(200, "Stripe connect account created successfully", {
                                success: true,
                                url: accountLink.url,
                        })
                );
        } else {
                const account = await stripe.accounts.create({ type: "express" });

                const accountLink = await stripe.accountLinks.create({
                        account: account.id,
                        refresh_url: `http://localhost:3001/refresh`,
                        return_url: `http://localhost:3001/success?activeCode=${uid}`,
                        type: "account_onboarding",
                });
                await StripeModel.create({ sellerId: id, stripeId: account.id, code: uid });
                res.status(200).json(
                        new ApiResponse(200, "Stripe connect account created successfully", {
                                success: true,
                                url: accountLink.url,
                        })
                );
        }
});

export default {
        create_stripe_connect_account,
};
