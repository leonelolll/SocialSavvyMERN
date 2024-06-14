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
import postsRouter from "./routes/posts.js";
import planRouter  from "./routes/plan1Route.js";
import receiptRouter from "./routes/receipt1Route.js";
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51POKtIKQg5ex9zFSEcmg9pRbYMXTNM77R8UYVAizd1IO76I2nj9T0U7AxPVeSaaZdgw80COEuzmdMg7tDgv6zE5f00DDPAGegt');

//import postsRouter from "./routes/posts.js";

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
app.use("/", postsRouter);
app.use('/api/plans', planRouter); 
app.use('/api/receipts', receiptRouter);

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

//route to Stripe API
app.post('/create-subscription', async (req, res) => {
    const { priceId, customerEmail } = req.body;

    try {
        // Create a new customer if necessary
        let customer = await stripeInstance.customers.list({ email: customerEmail, limit: 1 });
        if (customer.data.length === 0) {
            customer = await stripeInstance.customers.create({ email: customerEmail });
        } else {
            customer = customer.data[0];
        }

        // Create the Checkout session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            customer: customer.id,
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: 'http://localhost:3000/payment',
            cancel_url: 'http://localhost:3000/payment',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
    }
});

