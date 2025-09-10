import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import formidable from "formidable";
import Category from "../../models/categoryModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
dotenv.config();

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
        const { page, perPage, searchValue } = req.query;
        const skipPage = parseInt(perPage) * (parseInt(page) - 1);

        let category;
        let totalCategory;

        if (searchValue !== "" && perPage !== "" && page !== "") {
                category = await Category.find({
                        name: { $regex: searchValue, $options: "i" },
                })
                        .skip(skipPage)
                        .limit(parseInt(perPage))
                        .sort({ createdAt: -1 });

                totalCategory = await Category.countDocuments({
                        name: { $regex: searchValue, $options: "i" },
                });
        } else if (searchValue === "" && perPage !== "" && page !== "") {
                category = await Category.find().skip(skipPage).limit(parseInt(perPage)).sort({ createdAt: -1 });

                totalCategory = await Category.countDocuments();
        } else {
                category = await Category.find();
                totalCategory = await Category.countDocuments();
        }

        res.status(200).json(
                new ApiResponse(200, "", {
                        category,
                        totalCategory,
                })
        );
});

const update_category = asyncHandler(async (req, res) => {
        const { categoryId } = req.params;

        const parseForm = (req) => {
                return new Promise((resolve, reject) => {
                        const form = formidable({ multiples: true });
                        form.parse(req, (err, fields, files) => {
                                if (err) reject(err);
                                resolve({ fields, files });
                        });
                });
        };

        const { fields, files } = await parseForm(req);
        console.log(fields, files);
        const name = fields?.name[0];

        let imagePath;
        if (files?.image) {
                imagePath = files?.image[0] || "";
        }

        cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true,
        });

        // Find if category is exist
        const category = await Category.findById(categoryId);
        if (!category) {
                throw new ApiError(404, "Category not found");
        }

        //        Delete image from cloudinary

        const publicId = category.image.split("/").pop().split(".")[0];

        await cloudinary.uploader.destroy(publicId);

        // Upload new image to Cloudnary
        let result;
        if (imagePath)
                result = await cloudinary.uploader.upload(imagePath.filepath, {
                        folder: "categories",
                        resource_type: "image",
                });

        category.name = name;
        if (result) category.image = result.secure_url;
        await category.save();
        res.status(200).json(new ApiResponse(200, "Category updated successfully", { category }));
});
export default { add_category, get_category, update_category };
