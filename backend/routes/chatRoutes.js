import express from "express";
import chatControllers from "../controllers/chat/chatControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

// Customer
router.post("/customer/add-friend", chatControllers.add_customer_friend);
router.post("/customer/send-message-to-seller", chatControllers.send_message_to_seller);

// Seller
router.get("/seller/get-customers/:sellerId", chatControllers.get_customers);
router.get("/seller/get-customer-messages/:customerId", authMiddleware, chatControllers.get_customer_messages);
router.post("/seller/send-message-to-customer", authMiddleware, chatControllers.send_message_to_customer);

// Admin
router.get("/admin/get-sellers", chatControllers.get_sellers);

export default router;
