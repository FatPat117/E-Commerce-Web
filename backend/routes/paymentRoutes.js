import express from "express";
import paymentControllers from "../controllers/payment/paymentControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create-stripe-connect-account", authMiddleware, paymentControllers.create_stripe_connect_account);
router.patch(
        "/active-stripe-connect-account/:activeCode",
        authMiddleware,
        paymentControllers.active_stripe_connect_account
);
router.get("/seller-payment-details/:sellerId", authMiddleware, paymentControllers.seller_payment_details);
router.post("/withdraw-request", authMiddleware, paymentControllers.withdraw_request);
export default router;
