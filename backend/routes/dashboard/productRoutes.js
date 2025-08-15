import express from "express";
import productControllers from "../../controllers/dashboard/productControllers.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, productControllers.add_product);

export default router;
