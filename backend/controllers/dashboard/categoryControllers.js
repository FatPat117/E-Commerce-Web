import asyncHandler from "../../utils/asyncHandler.js";
const add_category = asyncHandler(async (req, res) => {
        console.log("hek");
        res.send("hello");
});

const get_category = asyncHandler(async (req, res) => {
        const categories = await Category.find();
        res.status(200).json(new ApiResponse(200, "Categories fetched successfully", { categories }));
});

export default { add_category, get_category };
