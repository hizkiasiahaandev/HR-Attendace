import { prisma } from "../../prisma/prisma";
import type { CreateLeaveRequestInput } from "../types/leave-request.types";

export const leaveRequestService = {
    async create(data: CreateLeaveRequestInput) {
        const employee = await prisma.employee.findUnique({
            where: {
                userId: data.userId,
            },
        });


        if (!employee) {
            throw new Error("Employee not found");
        }

        if (data.startDate > data.endDate) {
            throw new Error("Start date cannot be after end date");
        }

        return prisma.leaveRequest.create({
            data: {
                employeeId: employee.id,
                startDate: data.startDate,
                endDate: data.endDate,
                reason: data.reason,
            },
        });
    },

    async getMy(userId: number) {
        const employee = await prisma.employee.findUnique({
            where: { userId },
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        return prisma.leaveRequest.findMany({
            where: {
                employeeId: employee.id
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    async getAll() {
        return prisma.leaveRequest.findMany({
            include: {
                employee: {
                    select: {
                        employeeCode: true,
                        fullName: true,
                        position: true,
                        department: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    async approve(id: number) {
        const leaveRequest = await prisma.leaveRequest.findUnique({
            where: { id },
        });

        if (!leaveRequest) {
            throw new Error("Leave request not found");
        }

        if (leaveRequest.status !== "PENDING") {
            throw new Error("Leave request has already been processed");
        }

        return prisma.$transaction(async (tx) => {
            const updatedLeave = await tx.leaveRequest.update({
                where: { id },
                data: {
                    status: "APPROVED",
                },
            });

            const attendances = [];

            for (
                let date = new Date(leaveRequest.startDate);
                date <= leaveRequest.endDate;
                date.setDate(date.getDate() + 1)
            ) {
                attendances.push({
                    employeeId: leaveRequest.employeeId,
                    date: new Date(date),
                    status: "LEAVE" as const,
                    checkIn: null,
                    checkOut: null,
                });
            }

            await tx.attendance.createMany({
                data: attendances,
                skipDuplicates: true,
            });

            return updatedLeave;
        });
    },

    async reject(id: number) {
        const leaveRequest = await prisma.leaveRequest.findUnique({
            where: { id },
        });

        if (!leaveRequest) {
            throw new Error("Leave request not found");
        }

        if (leaveRequest.status !== "PENDING") {
            throw new Error("Leave request has already been processed");
        }

        return prisma.leaveRequest.update({
            where: { id },
            data: {
                status: "REJECTED",
            },
        });
    },


};