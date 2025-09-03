import moment from "moment/moment.js";
import mongoose from "mongoose";
import AuthOrder from "../../models/authOrder.js";
import Cart from "../../models/cartModel.js";
import Customer from "../../models/customerModel.js";
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

const get_dashboard_data = asyncHandler(async (req, res, next) => {
        const { userId } = req.params;

        // Find if customer is existed
        const existedCustomer = await Customer.findOne({ _id: userId });

        if (!existedCustomer) {
                return next(new ApiError(404, "Customer not found"));
        }

        // Find all Recent orders
        const customerRecentOrders = await CustomerOrder.find({
                customerId: new mongoose.Types.ObjectId(userId),
        }).limit(5);

        if (customerRecentOrders.length === 0) {
                return next(new ApiError(404, "No orders found"));
        }

        // Find all Pending orders
        const customerPendingOrders = await CustomerOrder.find({
                customerId: new mongoose.Types.ObjectId(userId),
                deliveryStatus: "pending",
        }).countDocuments();

        // Find all Cancelled orders
        const customerCancelledOrders = await CustomerOrder.find({
                customerId: new mongoose.Types.ObjectId(userId),
                deliveryStatus: "cancelled",
        }).countDocuments();

        // Find all Total orders
        const customerTotalOrders = await CustomerOrder.find({
                customerId: new mongoose.Types.ObjectId(userId),
        }).countDocuments();

        res.status(200).json(
                new ApiResponse(200, "", {
                        customerRecentOrders,
                        customerPendingOrders,
                        customerCancelledOrders,
                        customerTotalOrders,
                })
        );
});

const get_order = asyncHandler(async (req, res, next) => {
        const { customerId, status } = req.params;
        // Find if Customer is existed
        const existedCustomer = await Customer.findOne({ _id: customerId });

        if (!existedCustomer) {
                return next(new ApiError(404, "Customer not found"));
        }

        // Find all orders
        let orders;
        if (status != "all")
                orders = await CustomerOrder.find({
                        customerId: new mongoose.Types.ObjectId(customerId),
                        deliveryStatus: status,
                });
        else {
                orders = await CustomerOrder.find({
                        customerId: new mongoose.Types.ObjectId(customerId),
                });
        }
        res.status(200).json(new ApiResponse(200, "", { orders }));
});

const get_order_details = asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;

        const order = await CustomerOrder.findById(orderId);

        if (!order) {
                return next(new ApiError(404, "Order not found"));
        }

        res.status(200).json(new ApiResponse(200, "", { order }));
});

const get_admin_orders = asyncHandler(async (req, res, next) => {
        let { perPage, page, searchValue } = req.query;
        perPage = parseInt(perPage, 10);
        page = parseInt(page, 10);
        searchValue = searchValue || "";
        const skipPage = perPage * (page - 1);
        let orders;
        let totalOrder;

        // Find all orders
        orders = await CustomerOrder.aggregate([
                {
                        $lookup: {
                                from: "authorders",
                                localField: "_id",
                                foreignField: "orderId",
                                as: "order",
                        },
                },
        ])
                .skip(skipPage)
                .limit(perPage)
                .sort({ createdAt: -1 });

        totalOrder = await CustomerOrder.aggregate([
                {
                        $lookup: {
                                from: "authorders",
                                localField: "_id",
                                foreignField: "orderId",
                                as: "order",
                        },
                },
        ]);

        res.status(200).json(new ApiResponse(200, "", { orders, totalOrder: totalOrder.length }));
});

const get_admin_order_details = asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;

        const order = await CustomerOrder.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(orderId) } },
                {
                        $lookup: {
                                from: "authorders",
                                localField: "_id",
                                foreignField: "orderId",
                                as: "order",
                        },
                },
        ]);
        res.status(200).json(new ApiResponse(200, "", { order: order[0] }));
});

const admin_order_status_update = asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;
        const { deliveryStatus } = req.body;

        const order = await CustomerOrder.findByIdAndUpdate(orderId, {
                deliveryStatus: deliveryStatus,
        });
        if (!order) {
                return next(new ApiError(404, "Order not updated"));
        }
        res.status(200).json(
                new ApiResponse(200, "Order status updated successfully", {
                        message: "Order status updated successfully",
                })
        );
});

export default {
        place_order,
        get_dashboard_data,
        get_order,
        get_order_details,
        get_admin_orders,
        get_admin_order_details,
        admin_order_status_update,
};
