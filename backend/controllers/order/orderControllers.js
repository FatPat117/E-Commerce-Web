import asyncHandler from "../../utils/asyncHandler.js";

const place_order = asyncHandler(async (req, res, next) => {
        console.log(req.body);
});

export default {
        place_order,
};
