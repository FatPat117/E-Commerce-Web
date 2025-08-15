import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import Product from "../../models/productModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
const add_product = asyncHandler(async (req, res) => {
        const sellerId = req._id;

        const form = formidable({ multiples: true });

        const { fields, files } = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                        if (err) reject(err);
                        else resolve({ fields, files });
                });
        });

        const name = fields.name[0].trim();
        const brand = fields.brand[0].trim();
        const category = fields.category[0].trim();
        const stock = parseInt(fields.stock[0]);
        const price = parseInt(fields.price[0]);
        const discount = parseInt(fields.discount[0]);
        const description = fields.description[0].trim();
        const shopName = fields.shopName[0].trim();
        const images = files.images;
        const slug = name.split(" ").join("-").toLowerCase();

        cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true,
        });

        // Upload tất cả ảnh cùng lúc
        const uploadResults = await Promise.all(
                images.map((img) => cloudinary.uploader.upload(img.filepath, { folder: "products" }))
        );

        const allImagesUrl = uploadResults.map((res) => res.secure_url);

        if (allImagesUrl.length === 0) throw new ApiError(400, "No images uploaded");

        const product = await Product.create({
                sellerId,
                name,
                brand,
                category,
                stock,
                price,
                discount,
                description,
                shopName,
                images: allImagesUrl,
                slug,
        });

        res.status(201).json(new ApiResponse(201, "Product created successfully", product));
});
const get_product = asyncHandler(async (req, res) => {});

export default { add_product, get_product };
