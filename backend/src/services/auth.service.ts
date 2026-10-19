import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/prisma";
import { ENV } from "../config/env";
import type { ChangePasswordInput, LoginInput, LoginResponse } from "../types/auth.types";

export const authService = {
    async login({ email, password }: LoginInput): Promise<LoginResponse> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            ENV.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    },

    async getMe(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                employee: {
                    include: {
                        department: true
                    },
                },
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.employee) {
            throw new Error("Employee data not found");
        }

        const employeeId = user.employee.id;

        const [totalAttendance, present, late, absent] = await Promise.all([
            prisma.attendance.count({
                where: { employeeId },
            }),

            prisma.attendance.count({
                where: {
                    employeeId,
                    status: "PRESENT",
                },
            }),

            prisma.attendance.count({
                where: {
                    employeeId,
                    status: "LATE",
                },
            }),

            prisma.attendance.count({
                where: {
                    employeeId,
                    status: "ABSENT",
                },
            }),
        ]);

        return {
            id: user.id,
            email: user.email,
            role: user.role,

            employee: {
                id: user.employee.id,
                employeeCode: user.employee.employeeCode,
                fullName: user.employee.fullName,
                phone: user.employee.phone,
                position: user.employee.position,
                joinDate: user.employee.joinDate,
                department: user.employee.department,
            },

            attendanceSummary: {
                totalAttendance,
                present,
                late,
                absent,
            },
        };
    },

    async changePassword(
        id: number,
        data: ChangePasswordInput
    ) {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
            data.currentPassword,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Current password is incorrect");
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        await prisma.user.update({
            where: { id },
            data: {
                password: hashedPassword,
            },
        });
    },

    async getMeAdmin() {
        const admin = await prisma.user.findFirst({
            where: {
                role: "ADMIN",
            },
            omit: {
                password: true,
            }
        });

        if (!admin) {
            throw new Error("Admin not found");
        }

        return {
            admin
        }
    }

};