import express from "express";
import authControllers from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/get-user", authMiddleware, authControllers.getUser);
router.post("/admin-login", authControllers.admin_login);
router.post("/seller-register", authControllers.seller_register);
export default router;
