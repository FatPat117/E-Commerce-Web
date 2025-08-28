import express from "express";
import cartControllers from "../../controllers/home/cartController.js";

const router = express.Router();
router.post("/add-to-cart", cartControllers.add_to_cart);
router.get("/get-cart-products/:userId", cartControllers.get_cart_products);
router.post("/add-to-wishlist", cartControllers.add_to_wishlist);
router.get("/get-wishlist-products/:userId", cartControllers.get_wishlist_products);
router.delete("/delete-cart-product/:id", cartControllers.delete_cart_product);
router.patch("/quantity-increment/:cartId", cartControllers.quantity_increment);
router.patch("/quantity-decrement/:cartId", cartControllers.quantity_decrement);

export default router;
