import express from "express";
import cartControllers from "../../controllers/home/cartController.js";

const router = express.Router();
router.post("/add-to-cart", cartControllers.add_to_cart);

export default router;
