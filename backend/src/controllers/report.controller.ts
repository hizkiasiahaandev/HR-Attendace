import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { AuthRequest } from "../middleware/auth.middleware";
import { reportService } from "../services/report.service";

import {
    attendaceStatuses,
    type AttendanceReportInput,
} from "../types/reports.types";

export const reportController = {
    async downloadAttendanceReport(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Unauthorized",
                });
            }

            const { search, from, to, status } = req.query;

            if (
                status !== undefined &&
                (typeof status !== "string" ||
                    !attendaceStatuses.includes(
                        status as (typeof attendaceStatuses)[number],
                    ))
            ) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid attendance status",
                });
            }

            if (
                (from !== undefined &&
                    (typeof from !== "string" ||
                        !/^\d{4}-\d{2}-\d{2}$/.test(from))) ||
                (to !== undefined &&
                    (typeof to !== "string" ||
                        !/^\d{4}-\d{2}-\d{2}$/.test(to)))
            ) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid date format. Use YYYY-MM-DD",
                });
            }
            const input: AttendanceReportInput = {
                ...(typeof search === "string" && { search }),
                ...(typeof from === "string" && { from }),
                ...(typeof to === "string" && { to }),
                ...(typeof status === "string" && {
                    status: status as NonNullable<AttendanceReportInput["status"]>,
                }),
            };

            const buffer =
                await reportService.downloadAttendanceReport(input);

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );

            res.setHeader(
                "Content-Disposition",
                'attachment; filename="attendance-report.xlsx"',
            );

            return res.status(StatusCodes.OK).send(buffer);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to download attendance report",
            });
        }
    },
};