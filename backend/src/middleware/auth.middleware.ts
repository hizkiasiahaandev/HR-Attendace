import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { StatusCodes } from "http-status-codes";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: "ADMIN" | "EMPLOYEE";
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
            id: number;
            role: "ADMIN" | "EMPLOYEE";
        };

        req.user = decoded;

        next();
    } catch {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token",
        });
    }
};