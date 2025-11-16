import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from './lib/db.js'
import cookieParser from "cookie-parser"
import { errorHandler } from './middlewares/errorHandler.middleware.js'
import cors from "cors"

dotenv.config()

const app = express()

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(cookieParser());

const __dirname = path.resolve()

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req, res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
});