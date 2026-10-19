import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { departmentService } from "../services/department.service";

export const departmentController = {
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Department name is required",
                });
            }

            const department = await departmentService.create({
                name,
            });

            return res.status(StatusCodes.CREATED).json({
                message: "Department created successfully",
                data: department
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to create department",
            });
        };
    },

    async getAll(_req: Request, res: Response) {
        try {
            const department = await departmentService.getAll();
            return res.status(StatusCodes.OK).json({
                message: "Departments retrieved successfully",
                data: department
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error instanceof Error ? error.message : "Failed to get departments",
            });
        };
    },

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const department = await departmentService.getById(id);

            return res.status(StatusCodes.OK).json({
                message: "Department retrieved successfully",
                data: department,
            });
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error instanceof Error ? error.message : "Department not found",
            });
        };
    },

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name} = req.body;

            const department = await departmentService.update(id, {
                name
            });

            return res.status(StatusCodes.OK).json({
                  message: "Department updated successfully",
                  data: department,
            });
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error instanceof Error ? error.message: "Department not found",
            });
        };
    },

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const department = await departmentService.delete(id);
            
            return res.status(StatusCodes.OK).json({
                message: "Department deleted successfully",
            });
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error instanceof Error ? error.message:  "Department not found",
            });
        };
    },

};