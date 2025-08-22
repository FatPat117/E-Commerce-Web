import express from "express";
import homeControllers from "../../controllers/home/homeController.js";

const router = express.Router();
router.get("/get-categories", homeControllers.get_categories);

export default router;
