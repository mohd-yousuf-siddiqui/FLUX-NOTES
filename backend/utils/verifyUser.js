import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    
    // ✅ Debug logs (remove in production)
    console.log("Cookies received:", req.cookies);
    console.log("Token:", token);

    if (!token) {
        return next(errorHandler(401, "Unauthorized - No token"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("JWT verification error:", err.message);
            return next(errorHandler(403, "Forbidden - Invalid token"));
        }
        req.user = user;
        next();
    });
};