import Seller from "../../models/sellerModel.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
const get_seller_request = asyncHandler(async (req, res) => {
        const { page, perPage, searchValue } = req.query;
        const skipPage = parseInt(perPage) * (parseInt(page) - 1);

        let sellers;
        let totalSeller;

        if (searchValue !== "" && perPage !== "" && page !== "") {
                sellers = await Seller.find({
                        name: { $regex: searchValue, $options: "i" },
                        status: "pending",
                })
                        .skip(skipPage)
                        .limit(parseInt(perPage))
                        .sort({ createdAt: -1 });

                totalSeller = await Seller.countDocuments({
                        name: { $regex: searchValue, $options: "i" },
                        status: "pending",
                });
        } else if (searchValue === "" && perPage !== "" && page !== "") {
                sellers = await Seller.find({ status: "pending" })
                        .skip(skipPage)
                        .limit(parseInt(perPage))
                        .sort({ createdAt: -1 });

                totalSeller = await Seller.countDocuments({ status: "pending" });
        } else {
                sellers = await Seller.find({ status: "pending" });
                totalSeller = await Seller.countDocuments({ status: "pending" });
        }

        if (!sellers) {
                throw new ApiError(404, "Seller not found");
        }

        res.status(200).json(
                new ApiResponse(200, "", {
                        sellers,
                        totalSeller,
                })
        );
});

const get_seller = asyncHandler(async (req, res, next) => {
        const { sellerId } = req.params;

        //check if sellerID is vaild
        const seller = await Seller.findById(sellerId);
        if (!seller) throw new ApiError(404, "Seller not found");

        res.status(200).json(new ApiResponse(200, "", { seller }));
});
export default { get_seller_request, get_seller };
