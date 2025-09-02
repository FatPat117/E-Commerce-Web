import express from "express";
import orderControllers from "../../controllers/order/orderControllers.js";

const router = express.Router();

router.post("/place-order", orderControllers.place_order);
router.get("/get-order/:customerId/:status", orderControllers.get_order);
router.get("/get-order-details/:orderId", orderControllers.get_order_details);
router.get("/get-dashboard-data/:userId", orderControllers.get_dashboard_data);

//  Admin
router.get("/admin/orders", orderControllers.get_admin_orders);

export default router;
