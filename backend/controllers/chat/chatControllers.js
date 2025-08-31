import mongoose from "mongoose";
import SellerCustomer from "../../models/chat/sellerCustomerModel.js";
import Customer from "../../models/customerModel.js";
import Seller from "../../models/sellerModel.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
const add_customer_friend = asyncHandler(async (req, res, next) => {
        const { userId, sellerId } = req.body;

        // Find the seller
        if (!sellerId) {
                return next(new ApiError(400, "Cannot find the seller with the id"));
        }
        const seller = await Seller.findById(sellerId);
        if (!seller) {
                return next(new ApiError(404, "Seller not found"));
        }

        // Find the user
        const user = await Customer.findById(userId);
        if (!user) {
                return next(new ApiError(404, "User not found"));
        }

        // Check if the seller is already in the user's friends
        const checkSellerWithUser = await SellerCustomer.findOne({
                $and: [
                        { myId: new mongoose.Types.ObjectId(userId) },
                        { "myFriends.friendId": new mongoose.Types.ObjectId(sellerId) },
                ],
        });

        // If the seller is not in the user's friends, add it
        if (!checkSellerWithUser) {
                await SellerCustomer.updateOne(
                        { myId: new mongoose.Types.ObjectId(userId) },
                        {
                                $push: {
                                        myFriends: {
                                                friendId: new mongoose.Types.ObjectId(sellerId),
                                                shopName: seller.shopInfo.shopName,
                                                image: seller.image,
                                        },
                                },
                        }
                );
        }

        // Check if the user is already in the seller's friends
        const checkUserWithSeller = await SellerCustomer.findOne({
                $and: [
                        { myId: new mongoose.Types.ObjectId(sellerId) },
                        { "myFriends.friendId": new mongoose.Types.ObjectId(userId) },
                ],
        });

        // If the seller is not in the user's friends, add it
        if (!checkUserWithSeller) {
                await SellerCustomer.updateOne(
                        { myId: new mongoose.Types.ObjectId(sellerId) },
                        {
                                $push: {
                                        myFriends: {
                                                friendId: new mongoose.Types.ObjectId(userId),
                                                shopName: user.name,
                                                image: "",
                                        },
                                },
                        }
                );
        }
});

export default { add_customer_friend };
