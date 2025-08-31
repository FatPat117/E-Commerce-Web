import mongoose from "mongoose";
import SellerCustomerMessage from "../../models/chat/sellerCustomerMessageModel.js";
import SellerCustomer from "../../models/chat/sellerCustomerModel.js";
import Customer from "../../models/customerModel.js";
import Seller from "../../models/sellerModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const add_customer_friend = asyncHandler(async (req, res, next) => {
        const { userId, sellerId } = req.body;

        // Lấy thông tin user
        const user = await Customer.findById(userId);
        if (!user) {
                return next(new ApiError(404, "User not found"));
        }

        // Nếu không có sellerId thì chỉ trả về danh sách bạn bè
        if (!sellerId) {
                const allFriends = await SellerCustomer.findOne({ myId: new mongoose.Types.ObjectId(userId) });
                return res.status(200).json(
                        new ApiResponse(200, "Friends fetched successfully", {
                                myFriends: allFriends ? allFriends.myFriends : [],
                        })
                );
        }

        // Có sellerId → lấy thông tin seller
        const seller = await Seller.findById(sellerId);
        if (!seller) {
                return next(new ApiError(404, "Seller not found"));
        }

        // Check nếu chưa có thì add seller vào bạn bè user
        const checkSellerWithUser = await SellerCustomer.findOne({
                myId: new mongoose.Types.ObjectId(userId),
                "myFriends.friendId": new mongoose.Types.ObjectId(sellerId),
        });

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
                        },
                        { upsert: true } // đảm bảo có document
                );
        }

        // Check nếu chưa có thì add user vào bạn bè seller
        const checkUserWithSeller = await SellerCustomer.findOne({
                myId: new mongoose.Types.ObjectId(sellerId),
                "myFriends.friendId": new mongoose.Types.ObjectId(userId),
        });

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
                        },
                        { upsert: true }
                );
        }

        // Lấy messages giữa user & seller
        const messages = await SellerCustomerMessage.find({
                $or: [
                        { senderId: userId, receiverId: sellerId },
                        { senderId: sellerId, receiverId: userId },
                ],
        });

        // Lấy danh sách bạn bè user
        const allFriends = await SellerCustomer.findOne({ myId: new mongoose.Types.ObjectId(userId) });

        // Lấy bạn bè hiện tại
        const currentFriend = allFriends?.myFriends.find(
                (friend) => friend.friendId.toString() === sellerId.toString()
        );

        return res.status(200).json(
                new ApiResponse(200, "Messages fetched successfully", {
                        messages,
                        myFriends: allFriends ? allFriends.myFriends : [],
                        currentFriend: currentFriend || null,
                })
        );
});

export default { add_customer_friend };
