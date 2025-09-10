import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import formidable from "formidable";
import mongoose from "mongoose";
import AuthOrder from "../../models/authOrder.js";
import Banner from "../../models/bannerModel.js";
import AdminSellerMessage from "../../models/chat/adminSellerMessage.js";
import SellerCustomerMessage from "../../models/chat/sellerCustomerMessageModel.js";
import CustomerOrder from "../../models/customerOrder.js";
import MyShopWallet from "../../models/myShopWallet.js";
import Product from "../../models/productModel.js";
import Seller from "../../models/sellerModel.js";
import SellerWallet from "../../models/sellerWallet.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
dotenv.config();
const get_admin_dashboard_data = asyncHandler(async (req, res) => {
        const [totalSaleAgg, totalProduct, totalOrder, totalSeller, messages, recentOrders] = await Promise.all([
                // tổng tiền trong ví
                MyShopWallet.aggregate([{ $group: { _id: null, totalAmount: { $sum: "$amount" } } }]),

                // tổng sản phẩm
                Product.countDocuments(),

                // tổng order
                CustomerOrder.countDocuments(),

                // tổng seller
                Seller.countDocuments(),

                // tin nhắn admin gần nhất
                AdminSellerMessage.find().limit(3),

                // order gần nhất
                CustomerOrder.find().sort({ createdAt: -1 }).limit(5),
        ]);

        const totalSale = totalSaleAgg[0]?.totalAmount ?? 0;

        res.status(200).json(
                new ApiResponse(200, "", {
                        totalSale,
                        totalProduct,
                        totalOrder,
                        totalSeller,
                        messages,
                        recentOrders,
                })
        );
});

const get_seller_dashboard_data = asyncHandler(async (req, res, next) => {
        const id = req?._id;

        const totalSale = await SellerWallet.aggregate([
                {
                        $match: { sellerId: new mongoose.Types.ObjectId(id) },
                },
                {
                        $group: { _id: null, totalAmount: { $sum: "$amount" } },
                },
        ]);

        const totalProduct = await Product.countDocuments({ sellerId: new mongoose.Types.ObjectId(id) });

        const totalOrder = await AuthOrder.countDocuments({ sellerId: new mongoose.Types.ObjectId(id) });

        const totalPendingOrder = await AuthOrder.countDocuments({
                sellerId: new mongoose.Types.ObjectId(id),
                deliveryStatus: "pending",
        });

        const messages = await SellerCustomerMessage.find({
                $or: [{ senderId: new mongoose.Types.ObjectId(id) }, { receiverId: new mongoose.Types.ObjectId(id) }],
        }).limit(3);

        const recentOrders = await AuthOrder.find({ sellerId: new mongoose.Types.ObjectId(id) })
                .sort({ createdAt: -1 })
                .limit(5);

        res.status(200).json(
                new ApiResponse(200, "", {
                        totalSale: totalSale[0]?.totalAmount ?? 0,
                        totalProduct: totalProduct || 0,
                        totalOrder: totalOrder || 0,
                        totalPendingOrder: totalPendingOrder || 0,
                        messages: messages || [],
                        recentOrders: recentOrders || [],
                })
        );
});

const add_banner = asyncHandler(async (req, res, next) => {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
                if (err) {
                        return next(new ApiError(400, err.messages));
                }
                const productId = fields.productId[0];
                const bannerFile = files.banner[0];

                cloudinary.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        secure: true,
                });
                const { slug } = await Product.findById(productId);
                const result = await cloudinary.uploader.upload(bannerFile.filepath, { folder: "banners" });
                const banner = await Banner.create({
                        productId: new mongoose.Types.ObjectId(productId),
                        banner: result.secure_url,
                        link: slug,
                });
                if (!banner) {
                        return next(new ApiError(400, "Banner not created"));
                }
                res.status(200).json(
                        new ApiResponse(200, "Banner Add Successfully", {
                                banner,
                        })
                );
        });
});

export default { get_admin_dashboard_data, get_seller_dashboard_data, add_banner };
