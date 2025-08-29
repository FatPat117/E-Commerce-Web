import express from "express";
import homeControllers from "../../controllers/home/homeController.js";

const router = express.Router();
router.get("/get-categories", homeControllers.get_categories);
router.get("/get-products", homeControllers.get_products);
router.get("/price-range-latest-product", homeControllers.price_range_latest_product);
router.get("/query-products", homeControllers.query_products);
router.get("/product-details/:slug", homeControllers.product_details);
router.post("/customer-review", homeControllers.customer_review);
router.get("/get-review/:productId", homeControllers.get_review);

export default router;
