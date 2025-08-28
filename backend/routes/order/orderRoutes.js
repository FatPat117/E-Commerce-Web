import express from "express";
import orderControllers from "../../controllers/order/orderControllers.js";

const router = express.Router();

router.post("/place-order", orderControllers.place_order);
router.get("/get-dashboard-data/:userId", orderControllers.get_dashboard_data);

export default router;
