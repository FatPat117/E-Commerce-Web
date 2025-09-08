import express from "express";
import productControllers from "../../controllers/dashboard/productControllers.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, productControllers.add_product);
router.get("/", authMiddleware, productControllers.get_products);
router.get("/discount-products", authMiddleware, productControllers.get_discount_products);
router.get("/:productId", authMiddleware, productControllers.get_product);
router.patch("/:productId", authMiddleware, productControllers.update_product);
router.patch("/product-image-update/:productId", authMiddleware, productControllers.product_image_update);

export default router;
