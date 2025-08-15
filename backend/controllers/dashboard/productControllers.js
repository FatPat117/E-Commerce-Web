import formidable from "formidable";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
const add_product = asyncHandler(async (req, res) => {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
                if (err) {
                        throw new ApiError(404, "Something went wrong");
                }
                console.log(files);
                console.log(fields);
        });
});
const get_product = asyncHandler(async (req, res) => {});

export default { add_product, get_product };
