import express from "express";
import paymentControllers from "../controllers/payment/paymentControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create-stripe-connect-account", authMiddleware, paymentControllers.create_stripe_connect_account);
export default router;
