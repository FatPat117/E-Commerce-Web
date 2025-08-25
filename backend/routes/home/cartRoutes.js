import express from "express";
import cartControllers from "../../controllers/home/cartController.js";

const router = express.Router();
router.post("/add-to-cart", cartControllers.add_to_cart);
router.get("/get-cart-products/:userId", cartControllers.get_cart_products);

export default router;
