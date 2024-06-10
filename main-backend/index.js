import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/queRoute.js";
import complaintRoute from './routes/complaintRoute.js'
import feedbackRoute from './routes/feedbackRoute.js';
import cors from "cors";

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
// import path from "path";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

// connect to database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });

app.use("/api", route);
app.use("/api", complaintRoute);
app.use("/api", feedbackRoute);

app.use("/main-backend/user", userRoutes);
app.use("/main-backend/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });
  
  // Middleware configurations
  app.use(
      cors({
          origin: ["http://localhost:3000"],
          methods: ["GET", "POST", "PUT", "DELETE"],
          credentials: true,
      })
  );