import express from "express";
import customerControllers from "../../controllers/home/customerControllers.js";

const router = express.Router();
router.post("/customer-register", customerControllers.customer_register);
router.post("/customer-login", customerControllers.customer_login);
router.post("/customer-logout", customerControllers.customer_logout);

export default router;
