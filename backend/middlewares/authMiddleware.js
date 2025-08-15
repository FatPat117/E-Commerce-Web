import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
        let token;

        // check token in cookies
        if (req.cookies.accessToken) {
                token = req.cookies.accessToken;
        }
        // check token in headers
        else if (req.headers.authorization) {
                token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
                throw new ApiError(401, "Please login to access this page");
        }
        // verify token
        const decoded = jwt.verify(token, process.env.SECRET);

        req.role = decoded.data.role;
        req._id = decoded.data._id;
        next();
});

export default authMiddleware;
