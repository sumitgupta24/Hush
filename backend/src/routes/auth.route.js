import express from 'express'
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/signup",signup)
router.get("/login",(req, res) => {
    res.send("login Initiated");
})

export default router