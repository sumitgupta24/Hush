import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            throw new ApiError(401, "Unauthorized user")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            throw new ApiError(401, "Invalid token")
        }
        const user = await User.findById(decodedToken.userId).select("-password")

        if(!user){
            throw new ApiError(401, "user not found")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal server error")
    }
})