import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// ✅ Cookie options for cross-origin
const cookieOptions = {
    httpOnly: true,
    secure: true,        // Required for HTTPS (Render)
    sameSite: "none",    // Required for cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    path: "/"
};

// SIGNUP
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const isValidUser = await User.findOne({ email });

        if (isValidUser) {
            return next(errorHandler(400, "User already exists"));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        next(error);
    }
};

// SIGNIN
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        // ✅ Updated cookie with cross-origin options
        res.cookie("access_token", token, cookieOptions)
            .status(200)
            .json({
                success: true,
                message: "Login Successful",
                rest,
            });
    } catch (error) {
        next(error);
    }
};

// SIGNOUT
export const signout = async (req, res, next) => {
    try {
        // ✅ Must include same options when clearing
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        next(error);
    }
};