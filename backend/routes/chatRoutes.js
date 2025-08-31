import express from "express";
import chatControllers from "../controllers/chat/chatControllers.js";

const router = express.Router();

router.post("/customer/add_friend", chatControllers.add_customer_friend);

export default router;
