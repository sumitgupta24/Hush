import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const socketAuthMiddleware  = async (socket, next) => {
     try {
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1]

        if(!token){
            console.log("Socket connection rejected")
            return next(new Error("Unauthorised-NO token"))
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            console.log("Socket connection rejected: Invalid token")
            return next(new Error("Invalid Token"))
        }

        const user = await User.findById(decodedToken.userId).select("-password");
        if(!user){
            console.log("User not found");
            return next(new Error("Invalid User"))
        }

        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user: ${user.fullName}(${user._id})`)

        next()

     } catch (error) {
        console.log("Error in socket authentication", error.message);
        next(new Error("Unauthorized - Authentication failed"))
     }
}