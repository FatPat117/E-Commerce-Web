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
                sellers = await Seller.find({ status: "active" });
                totalSeller = await Seller.countDocuments({ status: "active" });
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

const seller_status_update = asyncHandler(async (req, res, next) => {
        const { sellerId } = req.params;
        const { status } = req.body;

        //check if sellerID is vaild
        const existedSeller = await Seller.findById(sellerId);
        if (!existedSeller) throw new ApiError(404, "Seller not found");

        const seller = await Seller.findByIdAndUpdate(sellerId, { status }, { new: true });

        res.status(200).json(new ApiResponse(200, "Seller status updated successfully", { seller }));
});

// Get active seller
const get_active_sellers = asyncHandler(async (req, res, next) => {
        let { page, perPage, searchValue } = req.query;
        page = parseInt(page);
        perPage = parseInt(perPage);
        const skipPage = perPage * (page - 1);

        let sellers;
        let totalSeller;

        if (searchValue !== "" && perPage !== "" && page !== "") {
                sellers = await Seller.find({
                        name: { $regex: searchValue, $options: "i" },
                        status: "active",
                })
                        .skip(skipPage)
                        .limit(parseInt(perPage))
                        .sort({ createdAt: -1 });

                totalSeller = await Seller.countDocuments({
                        name: { $regex: searchValue, $options: "i" },
                        status: "active",
                });
        } else if (searchValue === "" && perPage !== "" && page !== "") {
                sellers = await Seller.find({ status: "active" })
                        .skip(skipPage)
                        .limit(parseInt(perPage))
                        .sort({ createdAt: -1 });

                totalSeller = await Seller.countDocuments({ status: "active" });
        } else {
                sellers = await Seller.find({ status: "active" });
                totalSeller = await Seller.countDocuments({ status: "active" });
        }

        if (!sellers) {
                throw new ApiError(404, "Seller not found");
        }

        res.status(200).json(new ApiResponse(200, "", { sellers, totalSeller }));
});

// Get deactive seller
const get_deactive_sellers = asyncHandler(async (req, res, next) => {
        let { page, perPage, searchValue } = req.query;
        page = parseInt(page);
        perPage = parseInt(perPage);
        const skipPage = perPage * (page - 1);
        let sellers;
        let totalSeller;

        if (searchValue !== "" && perPage !== "" && page !== "") {
                sellers = await Seller.find({
                        name: { $regex: searchValue, $options: "i" },
                        status: "deactive",
                })
                        .skip(skipPage)
                        .limit(parseInt(perPage))
                        .sort({ createdAt: -1 });

                totalSeller = await Seller.countDocuments({
                        name: { $regex: searchValue, $options: "i" },
                        status: "deactive",
                });
        } else if (searchValue === "" && perPage !== "" && page !== "") {
                sellers = await Seller.find({ status: "deactive" })
                        .skip(skipPage)
                        .limit(parseInt(perPage))
                        .sort({ createdAt: -1 });

                totalSeller = await Seller.countDocuments({ status: "deactive" });
        } else {
                sellers = await Seller.find({ status: "deactive" });
                totalSeller = await Seller.countDocuments({ status: "deactive" });
        }

        if (!sellers) {
                throw new ApiError(404, "Seller not found");
        }

        res.status(200).json(new ApiResponse(200, "", { sellers, totalSeller }));
});
export default { get_seller_request, get_seller, seller_status_update, get_active_sellers, get_deactive_sellers };
