import express from "express";
import categoryControllers from "../../controllers/dashboard/categoryControllers.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, categoryControllers.add_category);
router.get("/", authMiddleware, categoryControllers.get_category);
router.delete("/:categoryId", authMiddleware, categoryControllers.delete_category);
router.patch("/:categoryId", authMiddleware, categoryControllers.update_category);
export default router;
