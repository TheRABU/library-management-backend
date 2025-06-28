import mongoose from "mongoose";
export const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI environment variable is not defined.");
        }
        const connect = await mongoose.connect(uri);
        console.log("Connected to your database successfully sir!");
    }
    catch (error) {
        console.log("Something did not go as planned at connectDB::", error instanceof Error ? error.message : error);
        throw error;
    }
};
