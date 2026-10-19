import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware";
import { StatusCodes } from "http-status-codes";

export const roleMiddleware = (...roles: ("ADMIN" | "EMPLOYEE")[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: "Forbidden",
            });
        }
        next();
    };
};