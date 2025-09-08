import AdminSellerMessage from "../../models/chat/adminSellerMessage.js";
import CustomerOrder from "../../models/customerOrder.js";
import MyShopWallet from "../../models/myShopWallet.js";
import Product from "../../models/productModel.js";
import Seller from "../../models/sellerModel.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

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

export default { get_admin_dashboard_data };
