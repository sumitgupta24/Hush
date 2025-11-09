import express from 'express'

const router = express.Router();

router.get("/signup",(req, res) => {
    res.send("Signup Initiated");
})
router.get("/login",(req, res) => {
    res.send("login Initiated");
})

export default router