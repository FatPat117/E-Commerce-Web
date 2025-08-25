import asyncHandler from "../../utils/asyncHandler.js";

const add_to_cart = asyncHandler(async (req, res, next) => {
        console.log(req.body);
});

export default {
        add_to_cart,
};
