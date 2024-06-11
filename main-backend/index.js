import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import Routes
import route from "./routes/queRoute.js";
import complaintRoute from './routes/complaintRoute.js';
import feedbackRoute from './routes/feedbackRoute.js';
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// Configure environment variables
dotenv.config();

const app = express();

// Middleware configurations
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// API endpoint for testing
app.get('/api', (req, res) => {
    res.json({ message: 'Here is your data' });
});

// Use routes
app.use("/api", route);
app.use("/api", complaintRoute);
app.use("/api", feedbackRoute);
app.use("/main-backend/user", userRoutes);
app.use("/main-backend/auth", authRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'main-frontend', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'main-frontend', 'build', 'index.html'));
});

// Connect to the database
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
