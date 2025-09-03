import asyncHandler from "../../utils/asyncHandler.js";

const create_stripe_connect_account = asyncHandler(async (req, res, next) => {
        console.log(req?._id);
        console.log("haha");
});

export default {
        create_stripe_connect_account,
};
