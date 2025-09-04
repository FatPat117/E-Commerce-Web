import express from "express";
import orderControllers from "../../controllers/order/orderControllers.js";

const router = express.Router();

router.post("/place-order", orderControllers.place_order);
router.get("/get-order/:customerId/:status", orderControllers.get_order);
router.get("/get-order-details/:orderId", orderControllers.get_order_details);
router.get("/get-dashboard-data/:userId", orderControllers.get_dashboard_data);
router.post("/create-payment-intent", orderControllers.create_payment_intent);
router.post("/confirm-payment/:orderId", orderControllers.confirm_payment);

//  Admin
router.get("/admin/orders", orderControllers.get_admin_orders);
router.get("/admin/order-details/:orderId", orderControllers.get_admin_order_details);
router.patch("/admin/order-status/:orderId", orderControllers.admin_order_status_update);

// Seller
router.get("/seller/orders/:sellerId", orderControllers.get_seller_orders);
router.get("/seller/order-details/:orderId", orderControllers.get_seller_order_details);
router.patch("/seller/order-status/:orderId", orderControllers.seller_order_status_update);
export default router;
