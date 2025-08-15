import formidable from "formidable";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const add_category = asyncHandler(async (req, res) => {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
                if (err) {
                        throw new ApiError(404, "Something went wrong");
                }
                let { name } = fields;
                const { image } = files;
                name = name.trim();
                const slug = name.split(" ").joib("-");
        });
});

const get_category = asyncHandler(async (req, res) => {
        const categories = await Category.find();
        res.status(200).json(new ApiResponse(200, "Categories fetched successfully", { categories }));
});

export default { add_category, get_category };
