import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { StatusCodes } from "http-status-codes";
import { leaveRequestService } from "../services/leave-request.service";

export const leaveRequestController = {
    async create(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Unauthorized",
                });
            }

            const { startDate, endDate, reason } = req.body;

            if (!startDate || !endDate || !reason) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Start date, end date, and reason are required",
                });
            }

            const leaveRequest = await leaveRequestService.create({
                userId: req.user.id,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason
            });

            return res.status(StatusCodes.CREATED).json({
                message: "Leave request created successfully",
                data: leaveRequest,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to create leave request",
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

            const leaveRequests = await leaveRequestService.getMy(req.user.id);
            return res.status(StatusCodes.OK).json({
                message: "My leave requests retrieved successfully",
                data: leaveRequests,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to get leave requests",
            });
        };
    },

    async getAll(_req: AuthRequest, res: Response) {
        try {
            const leaveRequests = await leaveRequestService.getAll();

            return res.status(StatusCodes.OK).json({
                message: "Leave requests retrieved successfully",
                data: leaveRequests,
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error instanceof Error ? error.message : "Failed to get leave requests",
            });
        };
    },

    async approve(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id);

            const leaveRequest = await leaveRequestService.approve(id);
            return res.status(StatusCodes.OK).json({
                message: "Leave request approved successfully",
                data: leaveRequest,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to approve leave request",
            });
        };
    },

    async reject(req: AuthRequest, res: Response) {
        try {
            const id = Number(req.params.id);

            const leaveRequest = await leaveRequestService.reject(id);

            return res.status(StatusCodes.OK).json({
                message: "Leave request rejected successfully",
                data: leaveRequest,
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to reject leave request",
            });
        };
    },



};