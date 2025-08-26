import moment from "moment/moment.js";
import AuthOrder from "../../models/authOrder.js";
import Cart from "../../models/cartModel.js";
import CustomerOrder from "../../models/customerOrder.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const paymentCheck = async (id) => {
        const order = await CustomerOrder.findById(id);

        if (!order) throw new ApiError(404, "Order not found");

        if (order.paymentStatus === "unpaid") {
                await CustomerOrder.findByIdAndUpdate(id, {
                        deliveryStatus: "cancelled",
                });

                await AuthOrder.updateMany({ orderId: id }, { $set: { deliveryStatus: "cancelled" } });
        }
        return true;
};

const place_order = asyncHandler(async (req, res, next) => {
        const { price, products, shippingFee, items, shippingInfo, navigate } = req.body;
        const userId = req._id || req.body.userInfo.id;
        let authorOrderData = [];
        let cartId = [];
        const tempDate = moment(Date.now()).format("LLL");
        let customerOrderProduct = [];

        if (!products || !Array.isArray(products)) {
                return next(new ApiError(400, "Invalid products data"));
        }

        // customerOrderProduct

        for (let i = 0; i < products.length; i++) {
                const pros = products[i]?.products || [];

                for (let j = 0; j < pros.length; j++) {
                        const tempProduct = pros[j].productInfo;
                        tempProduct.quantity = pros[j].quantity;
                        customerOrderProduct.push(tempProduct);
                        if (pros[j]._id) {
                                cartId.push(pros[j]._id);
                        }
                }
        }

        const order = await CustomerOrder.create({
                customerId: userId,
                products: customerOrderProduct,
                price: parseInt(price, 10) + parseInt(shippingFee || 0, 10),
                shippingInfo: shippingInfo,
                paymentStatus: "unpaid",
                deliveryStatus: "pending",
                date: tempDate,
        });

        for (let i = 0; i < products.length; i++) {
                const pros = products[i]?.products || [];
                const pri = products[i]?.price;
                const sellerId = products[i]?.sellerId;
                let storePros = [];

                for (let j = 0; j < pros.length; j++) {
                        const tempProduct = pros[j].productInfo;
                        tempProduct.quantity = pros[j].quantity;
                        storePros.push(tempProduct);
                }
                authorOrderData.push({
                        orderId: order._id,
                        sellerId: sellerId,
                        price: pri,
                        products: storePros,
                        paymentStatus: "unpaid",
                        deliveryStatus: "pending",
                        shippingInfo: "Easy Main WareHouse",
                        date: tempDate,
                });
        }

        await AuthOrder.insertMany(authorOrderData);

        for (let i = 0; i < cartId.length; i++) {
                await Cart.findByIdAndDelete(cartId[i]);
        }

        setTimeout(() => {
                paymentCheck(order._id).catch((err) => console.error("paymentCheck error:", err));
        }, 10000);

        res.status(200).json(new ApiResponse(200, "Order placed successfully", { orderId: order._id }));
});

export default {
        place_order,
};
