import express from "express";
import dashboardControllers from "../../controllers/dashboard/dashboardControllers.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/admin-dashboard-data", authMiddleware, dashboardControllers.get_admin_dashboard_data);
router.get("/seller-dashboard-data", authMiddleware, dashboardControllers.get_seller_dashboard_data);
router.post("/banner", authMiddleware, dashboardControllers.add_banner);

export default router;
