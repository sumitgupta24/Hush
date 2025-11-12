import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const arcjetProtection = asyncHandler(async (req,res,next) => {
    try {
        const decision = await aj.protect(req);
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                throw new ApiError(429, "Rate limit exceeded")
            }
            else if(decision.reason.isBot()){
                throw new ApiError(403, "Bot Access denied")
            }
            else{
                throw new ApiError(402, "Access denied by security policy")
            }
        }

        if(decision.isSpoofedBot()){
            return res.status(403).json({
                error: "Spoof Bot detected",
                message: "Malicious bot activity detected"
            });
        }

        next();
    } catch (error) {
        console.log("Arcjet Protection Error: ", error);
        next();
    }
})