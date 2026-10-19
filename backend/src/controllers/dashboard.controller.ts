import type { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service";
import { StatusCodes } from "http-status-codes";

export const dashboardController = {
    async getSummary(_req: Request, res: Response) {
        try {
            const summary = await dashboardService.getSummary();

            return res.status(StatusCodes.OK).json({
                message: "Dashboard retrieved successfully",
                data: summary,
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error instanceof Error ? error.message : "Failed to get dashboard",
            });
        };
    },
};