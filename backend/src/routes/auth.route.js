import express from 'express'
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection)

router.post("/signup", signup);
router.post("/login", login)
router.post("/logout",logout)
router.put("/update-profile", verifyJWT, updateProfile)

router.get("/check",verifyJWT,(req, res) => res.status(200).json(req.user))

export default router