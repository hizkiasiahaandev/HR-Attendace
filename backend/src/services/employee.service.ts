import bcrypt from "bcryptjs";
import { prisma } from "../../prisma/prisma";
import type { CreateEmployeeInput, UpdateEmployeeInput } from "../types/employee.types";

export const employeeService = {
    async create(data: CreateEmployeeInput) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });


        if (existingUser) {
            throw new Error("Email already registered");
        }

        const existingEmployee = await prisma.employee.findUnique({
            where: { employeeCode: data.employeeCode },
        });

        if (existingEmployee) {
            throw new Error("Employee code already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    role: "EMPLOYEE",
                },
            });

            const employee = await tx.employee.create({
                data: {
                    userId: user.id,
                    employeeCode: data.employeeCode,
                    fullName: data.fullName,
                    phone: data.phone ?? null,
                    position: data.position,
                    joinDate: data.joinDate,
                    departmentId: data.departmentId
                },
            });

            return employee;
        });
    },

    async getAll() {
        return prisma.employee.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    async getById(id: number) {
        const employee = await prisma.employee.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        return employee;
    },

    async paginate(
        page: number = 1,
        limit: number = 10,
        search?: string
    ) {
        const skip = (page - 1) * limit;

        const where = search
            ? {
                OR: [
                    {
                        fullName: {
                            contains: search,

                        },
                    },
                    {
                        employeeCode: {
                            contains: search,
                        },
                    },
                ],
            }
            : {};

        const [employees, total] = await Promise.all([
            prisma.employee.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
                orderBy: {
                    joinDate: "asc",
                },
            }),

            prisma.employee.count({
                where
            }),
        ]);

        return {
            data: employees,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
        };
    },

    async update(id: number, data: UpdateEmployeeInput) {
        const employee = await prisma.employee.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        const existingEmail = await prisma.user.findFirst({
            where: {
                email: data.email,
                id: {
                    not: employee.userId,
                },
            },
        });

        if (existingEmail) {
            throw new Error("Email already registered");
        }

        const existingEmployee = await prisma.employee.findFirst({
            where: {
                employeeCode: data.employeeCode,
                id: {
                    not: id,
                },
            },
        });

        if (existingEmployee) {
            throw new Error("Employee code already exists");
        }

        return prisma.$transaction( async (tx) => {
            await tx.user.update({
                where: {
                    id: employee.userId
                },
                data: {
                    email: data.email,
                    ...(data.password && {
                        password: await bcrypt.hash(data.password, 10),
                    }),
                },
            });

            return tx.employee.update({
                where: {
                    id,
                },

                data: {
                    employeeCode: data.employeeCode,
                    fullName: data.fullName,
                    phone: data.phone ?? null,
                    position: data.position,
                    joinDate: data.joinDate,
                    departmentId: data.departmentId,
                },
                include: {
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
            });
        });
    },

    

};