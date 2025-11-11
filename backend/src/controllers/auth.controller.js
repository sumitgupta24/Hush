import { generateToken } from "../lib/token.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs"
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import "dotenv/config"
import cloudinary from "../lib/cloudinary.js";

export const signup = asyncHandler( async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    if (password.length < 6) {
        throw new ApiError(400, "Password must be of length 6");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid Email Format");
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(400, "User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        fullName,
        email,
        password: hashedPassword
    })

    if (!newUser) {
        throw new ApiError(400, "Invalid user data")
    }

    const savedUser = await newUser.save();
    generateToken(newUser._id, res);

    if (!newUser) {
        throw new ApiError(400, "User couldn't be created");
    }

    try {
        await sendWelcomeEmail(savedUser.email,savedUser.fullName,process.env.CLIENT_URL);
    } catch (error) {
        console.error("Failed to send",error);
    }

    return res.status(201).json(
        new ApiResponse(200, newUser, "User Registered Successfully!")
    );
})

export const login  = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(404, "Email or Password is necessary")
    }

    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404, "Invalid Credentials")
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Credentials")
    }

    generateToken(user._id,res);
    return res.status(200).json(
        new ApiResponse(200, user, "User Logged In Successfully")
    )
})  

export const logout = asyncHandler( async (req, res) => {
    res.cookie("jwt"," ",{maxAge: 0})
    return res.status(200).json(
        new ApiResponse(200,{},"Logged out successfully")
    )
})

export const updateProfile = asyncHandler( async (req, res) => {
    const {profilePicture}  = req.body;
    if(!profilePicture){
        throw new ApiError(400, "Profile Picture is Needed")
    }

    const userId = req.user._id;

    const uploadOnCloudinary = await cloudinary.uploader.upload(profilePicture)

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {profilePicture: uploadOnCloudinary.secure_url},
        {new : true}
    ).select("-password");

    if(!updatedUser){
        throw new ApiError(500, "Profile Picture couldn'e be uploaded")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "profile picture uploaded")
    );
})