import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Ensure function execution stops here
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded; // Attach user data to request
        next(); // Call next() instead of returning a Response
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
};

export { authenticate};
