import asyncHandler from "../../utils/asyncHandler.js";
const get_seller_request = asyncHandler(async (req, res) => {
        console.log(req.query);
});

export default { get_seller_request };
