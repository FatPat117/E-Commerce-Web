import express from "express";
import authControllers from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin-login", authControllers.admin_login);
router.post("/seller-register", authControllers.seller_register);
router.post("/seller-login", authControllers.seller_login);

router.get("/get-user", authMiddleware, authControllers.getUser);
export default router;
