import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
export const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message || "Internal Server Error",
    });
};