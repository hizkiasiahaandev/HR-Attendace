import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { employeeService } from "../services/employee.service";
import type { UpdateEmployeeInput } from "../types/employee.types";

export const employeeController = {

    async create(req: Request, res: Response) {
        try {
            const { employeeCode, fullName, email, password, phone, position, joinDate, departmentId } = req.body;

            if (!employeeCode || !fullName || !email || !password || !position || !joinDate) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Required fields are missing",
                });
            }

            const employee = await employeeService.create({
                employeeCode,
                fullName,
                email,
                password,
                phone,
                position,
                joinDate: new Date(joinDate),
                departmentId: Number(departmentId)
            });

            return res.status(StatusCodes.CREATED).json({
                message: "Employee created successfully",
                data: employee
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to create employee",
            });
        }
    },

    async getAll(_req: Request, res: Response) {
        try {
            const employees = await employeeService.getAll();

            return res.status(StatusCodes.OK).json({
                message: "Employees retrieved successfully",
                data: employees
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error instanceof Error ? error.message : "Failed to get employees",
            });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const employee = await employeeService.getById(id);

            return res.status(StatusCodes.OK).json({
                message: "Employee retrieved successfully",
                data: employee
            });
        } catch (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error instanceof Error ? error.message : "Employee not found",
            });
        }
    },

    async paginate(req: Request, res: Response) {
        try {
            const page = Math.max(
                Number(req.query.page) || 1,
                1
            );

            const limit = Math.min(
                Math.max(Number(req.query.limit) || 10, 1),
                100
            );

            const search = req.query.search as string | undefined;

            const result = await employeeService.paginate(
                page,
                limit,
                search
            );

            return res.status(StatusCodes.OK).json({
                message: "Employees retrieved successfully",
                data: result.data,
                pagination: result.meta
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error instanceof Error ? error.message : "Failed to fetch employees",
            });
        };
    },

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const data: UpdateEmployeeInput = {
                employeeCode: req.body.employeeCode,
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                position: req.body.position,
                joinDate: new Date(req.body.joinDate),
                departmentId: Number(req.body.departmentId),
            };

            const employee = await employeeService.update(id, data);

            return res.status(StatusCodes.OK).json({
                message: "Employee updated successfully",
                data: employee
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error instanceof Error ? error.message : "Failed to update employee",
            });
        };
    },


}