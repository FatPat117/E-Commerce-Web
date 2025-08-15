import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
const add_product = asyncHandler(async (req, res) => {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
                if (err) {
                        throw new ApiError(404, "Something went wrong");
                }
                //  console.log(files);
                //  console.log(fields);

                const name = fields.name[0].trim();
                const brand = fields.brand[0].trim();
                const category = fields.category[0].trim();
                const stock = fields.stock[0].trim();
                const price = fields.price[0].trim();
                const discount = fields.discount[0].trim();
                const description = fields.description[0].trim();
                const shopName = fields.shopName[0].trim();
                const images = files.images;
                const slug = name.split(" ").join("-").toLowerCase();

                //  Upload images to cloudinary
                cloudinary.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        secure: true,
                });

                let allImagesUrl = [];
                for (let i = 0; i < images.length; i++) {
                        const result = await cloudinary.uploader.upload(images[i].filepath);
                        allImagesUrl.push(result.secure_url);
                }
        });
});
const get_product = asyncHandler(async (req, res) => {});

export default { add_product, get_product };
