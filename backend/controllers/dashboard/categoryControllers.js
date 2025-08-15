import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import Category from "../../models/categoryModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
const add_category = asyncHandler(async (req, res) => {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
                if (err) {
                        throw new ApiError(404, "Something went wrong");
                }
                let name = fields.name[0];
                const image = files.image[0];
                name = name.trim();
                const slug = name.split(" ").join("-");

                //  Cloudinary Config
                cloudinary.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        secure: true,
                });

                //  Upload to cloudinary
                const result = await cloudinary.uploader.upload(image.filepath, {
                        folder: "categories",
                        resource_type: "image",
                });

                if (!result) throw new ApiError(404, "Something went wrong when uploading image");

                //  Create Category
                const category = await Category.create({ name, slug, image: result.secure_url });
                res.status(201).json(new ApiResponse(201, "Category added successfully", { category }));
        });
});

const get_category = asyncHandler(async (req, res) => {
        const categories = await Category.find();
        res.status(200).json(new ApiResponse(200, "Categories fetched successfully", { categories }));
});

export default { add_category, get_category };
