import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "../services/auth.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const authController = {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Email and password are required",
                });
            }

            const result = await authService.login({
                email,
                password
            });

            return res.status(StatusCodes.OK).json({
                message: "Login successfully",
                data: result,
            });
        } catch (error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: error instanceof Error ? error.message : "Login failed",
            });
        }
    },

    async getMe(req: AuthRequest, res: Response) {
        try {
            const result = await authService.getMe(Number(req.user?.id));
            return res.status(StatusCodes.OK).json({
                message: "Get profile successfully",
                data: result,
            });
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error instanceof Error ? error.message : "Failed to get profile",
            });
        };
    },

    async changePassword(req: AuthRequest, res: Response) {
        try {
            const result = await authService.changePassword(
                Number(req.user?.id),
                req.body
            );

            return res.status(StatusCodes.OK).json({
                message: "Password changed successfully",
                data: result
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to change password",
            });
        };
    },

    async getMeAdmin(_req: Request, res: Response) {
        try {
            const result = await authService.getMeAdmin();

            return res.status(StatusCodes.OK).json({
                message: "Get admin profile successfully",
                data: result,
            });
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error instanceof Error ? error.message : "Failed to get admin profile",
            });
        };
    },

};