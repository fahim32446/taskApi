import express from 'express'
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv'

import authRoute from "./routes/auth.js";
import productsRoute from "./routes/products.js";
import usersRoute from "./routes/users.js";


const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error
    }
}


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});



app.listen(5000, () => {
    connect();
    console.log("Connected to backend.");
});