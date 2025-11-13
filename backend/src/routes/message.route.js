import express from 'express'
import { getAllContacts, getChatPartners, getMessageByUserId, sendMessage } from '../controllers/message.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/contacts",verifyJWT, getAllContacts);
router.get("/chats",verifyJWT,getChatPartners);
router.get("/:id",verifyJWT,getMessageByUserId);
router.post("/send/:id", verifyJWT,sendMessage); 

export default router