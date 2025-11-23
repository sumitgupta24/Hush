import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId, io} from "../lib/socket.js"

export const getAllContacts  = asyncHandler(async (req, res) => {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({_id: { $ne: loggedInUser }}).select("-password");

    if(!filteredUsers){
        throw new ApiError(404, "No contacts found");
    }

    return res.status(200).json(
        new ApiResponse(200, filteredUsers, "Contacts fetched successfully")
    );
})

export const getMessageByUserId = asyncHandler(async (req, res) => {
    const loggedInUser = req.user._id;
    const otherUserId = req.params.id;  
    const messages = await Message.find({
        $or: [
            { senderId: loggedInUser, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: loggedInUser }
        ]
    });  
    
    if(!messages || messages.length === 0){
        throw new ApiError(404, "No messages found");
    }

    return res.status(200).json(
        new ApiResponse(200, messages, "Messages fetched successfully")
    );
});

export const sendMessage = asyncHandler(async (req, res) => {
    const {text, image} = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;   

    if(!text && !image){
        throw new ApiError(400, "Text or image is necessary")
    }

    let imageURL;
    if(image){
        const uploadedImage = await cloudinary.uploader.upload(image);
        imageURL = uploadedImage.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageURL
    });

    if(!newMessage){
        throw new ApiError(500, "Failed to create message");
    }

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId)

    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(
        new ApiResponse(201,newMessage,"Message sent successfully")
    );
});

export const getChatPartners = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
        $or: [{senderId: loggedInUserId}, {receiverId: loggedInUserId}]
    });

    const chatPartnerIds = [
        ...new Set(messages.map(msg => 
        msg.senderId.toString() === loggedInUserId.toString() 
        ? msg.receiverId.toString() 
        : msg.senderId.toString())
        ),
    ];

    const chatPartners = await User.find({_id: {$in:chatPartnerIds}}).select("-password");

    if(!chatPartners || chatPartners.length === 0){
        throw new ApiError(403, "Chat not found")
    }

    return res.status(200).json(
        new ApiResponse(200, chatPartners, "Partnes fetched successfully")
    )
})