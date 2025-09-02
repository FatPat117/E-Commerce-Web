import express from "express";
import sellerController from "../../controllers/dashboard/sellerController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/request-seller", authMiddleware, sellerController.get_seller_request);
router.get("/active-sellers", authMiddleware, sellerController.get_active_sellers);
router.get("/deactive-sellers", authMiddleware, sellerController.get_deactive_sellers);
router.patch("/status-update/:sellerId", authMiddleware, sellerController.seller_status_update);
router.get("/:sellerId", authMiddleware, sellerController.get_seller);
export default router;
