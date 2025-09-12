import express from "express";
import Product from "../models/productModel.js";
const router = express.Router();
router.get("/test-db", async (req, res) => {
        try {
                const product = await Product.find().limit(5);
                res.json({
                        status: "ok",
                        product,
                });
        } catch (err) {
                res.status(500).json({ status: "error", message: err.message });
        }
});

export default router;
