import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
        {
                productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: true,
                },
                banner: {
                        type: String,
                        required: true,
                },
                link: {
                        type: String,
                        required: true,
                },
        },
        { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
