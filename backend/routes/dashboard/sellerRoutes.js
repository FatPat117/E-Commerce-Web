import express from "express";
import sellerController from "../../controllers/dashboard/sellerController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/request-seller", authMiddleware, sellerController.get_seller_request);

export default router;
