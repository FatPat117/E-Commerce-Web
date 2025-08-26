import moment from "moment/moment.js";
import asyncHandler from "../../utils/asyncHandler.js";

const place_order = asyncHandler(async (req, res, next) => {
        const { price, products, shippingFee, items, shippingInfo, userInfo, navigate } = req.body;

        let authorOrderData = [];
        let cartId = [];
        const tempDate = moment(Date.now()).format("LLL");
});

export default {
        place_order,
};
