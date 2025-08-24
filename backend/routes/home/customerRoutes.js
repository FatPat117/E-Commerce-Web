import express from "express";
import customerControllers from "../../controllers/home/customerControllers.js";

const router = express.Router();
router.post("/customer-register", customerControllers.customer_register);

export default router;
