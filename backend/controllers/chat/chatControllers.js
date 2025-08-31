import asyncHandler from "../../utils/asyncHandler.js";
const add_customer_friend = asyncHandler(async (req, res, next) => {
        console.log(req.body);
});

export default { add_customer_friend };
