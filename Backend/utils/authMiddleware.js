import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
        req.userId = decodedData?.userId;
        
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;
