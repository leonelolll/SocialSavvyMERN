import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/queRoute.js";
import complaintRoute from './routes/complaintRoute.js'
import feedbackRoute from './routes/feedbackRoute.js';
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(()=>{
        console.log("DB connected successfully.")
        app.listen(PORT,()=>{
                console.log(`Server is running on port :${PORT}`);
        });
    })
    .catch((error)=> console.log(error));

app.use("/api", route);
app.use("/api", complaintRoute);
app.use("/api", feedbackRoute);