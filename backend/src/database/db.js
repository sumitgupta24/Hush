import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully: ",connect.connection.host)
    } catch (error) {
        console.error("Mongo DB connection failed");
        process.exit(1)
    }
}