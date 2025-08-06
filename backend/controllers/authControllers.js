import asyncHandler from "../utils/asyncHandler.js";
import Admin from "../models/adminModel.js";
import ApiError from "../utils/ApiError.js";

const admin_login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
                throw new ApiError(400, "All fields are required");
        }
        const admin = await Admin.findOne({email});
        if(!admin){
                throw new ApiError(400, "Admin not found");
        }
        return res.status(200).json({ message: "Admin login successful" });
};

export default { admin_login };
