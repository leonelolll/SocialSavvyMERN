import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../util/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (req, res, next) => {
    const { email, password, cpassword } = req.body;
    if (password !== cpassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        console.log("TOKEN_KEY:", process.env.TOKEN_KEY); // Log TOKEN_KEY
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
        const token = jwt.sign({ id: validUser._id }, process.env.TOKEN_KEY);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
            .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const forgetpass = async (req, res) => {
    const { email } = req.body;
    try {
        console.log("Request Body:", req.body);

        //Find the user by email
        const user = await User.findOne({ email });

        //If user not found, send error message
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        //Generate a unique JWT token for the user that contains the user's id
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: "10m", });

        // Send the token to the user's email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_APP_EMAIL,
            },
        });

        //Email configuration
        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Reset Password",
            html: `<h1>Reset Your Password</h1>
            <p>Click on the following link to reset your password:</p>
            <a href="http://localhost:3000/resetpass/${token}">http://localhost:5173/resetpass/${token}</a>
            <p>The link will expire in 10 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email.</p>`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            res.status(200).send({ message: "Email sent!" });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        // Verify the token sent by the user
        const decodedToken = jwt.verify(
            req.params.token,
            process.env.TOKEN_KEY
        );

        // If the token is invalid, return an error
        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid token" });
        }

        // find the user with the id from the token
        const user = await User.findOne({ _id: decodedToken.userId });
        if (!user) {
            return res.status(401).send({ message: "no user found" });
        }

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        req.body.newPassword = await bcryptjs.hash(req.body.newPassword, salt);

        // Update user's password, clear reset token and expiration time
        user.password = req.body.newPassword;
        await user.save();

        // Send success response
        res.status(200).send({ message: "Password updated" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        } else {
            const generatePassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_KEY);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res) => {
    res.clearCookie("access_token").status(200).json("Signout is successful!");
};

export const authenticate = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).json({ success: false, message: "Unauthorised!" });
    }
    try {
        const data = jwt.verify(token, process.env.TOKEN_KEY);
        req.userId = data.id;
        return res.status(200).json({ success: true, message: "Authenticated!" });
    } catch {
        return res.status(403).json({ success: false, message: "Unauthorised!" })
    }
}