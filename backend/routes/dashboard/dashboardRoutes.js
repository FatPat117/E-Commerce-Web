import express from "express";
import dashboardControllers from "../../controllers/dashboard/dashboardControllers.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/dashboard", authMiddleware, dashboardControllers.get_admin_dashboard_data);

export default router;
