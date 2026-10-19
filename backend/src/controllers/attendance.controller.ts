import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { attendanceService } from "../services/attendance.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const attendanceController = {

    async checkIn(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Unauthorized",
                });
            }

            const attendances = await attendanceService.checkIn(req.user.id);

            return res.status(StatusCodes.CREATED).json({
                message: "Check-in successful",
                data: attendances,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Check-in failed",
            });
        };
    },

    async checkOut(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Unauthorized",
                });
            }

            const attendance = await attendanceService.checkOut(req.user.id);

            return res.status(StatusCodes.OK).json({
                message: "Check-out successful",
                data: attendance,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Check-out failed",
            });
        };
    },

    async getAll(_req: Request, res: Response) {
        try {
            const attendances = await attendanceService.getAll();

            return res.status(StatusCodes.OK).json({
                message: "Attendances retrieved successfully",
                data: attendances,
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error instanceof Error ? error.message : "Failed to get attendances",
            });
        };
    },

    async getMy(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Unauthorized",
                });
            }

            const attendances = await attendanceService.getMy(req.user.id);

            return res.status(StatusCodes.OK).json({
                message: "My attendances retrieved successfully",
                data: attendances,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to get attendances",
            });
        };
    },

    async checkAttendance(_req: Request, res: Response) {
        try {
            const result = await attendanceService.checkAttendance();
            return res.status(StatusCodes.OK).json({
                message: result.message,
                data: result,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to check attendance",
            });
        };
    },




};