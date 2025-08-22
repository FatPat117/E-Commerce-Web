import Category from "../../models/categoryModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
const get_categories = asyncHandler(async (req, res, next) => {
        const categories = await Category.find({});

        if (categories) {
                res.status(200).json(new ApiResponse(200, "", categories));
        } else {
                next(new ApiError(404, "No categories found"));
        }
});

export default {
        get_categories,
};
