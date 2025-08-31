import express from "express";
import chatControllers from "../controllers/chat/chatControllers.js";

const router = express.Router();

router.post("/customer/add-friend", chatControllers.add_customer_friend);
router.post("/customer/send-message-to-seller", chatControllers.send_message_to_seller);
router.get("/seller/get-customers/:sellerId", chatControllers.get_customers);

export default router;
