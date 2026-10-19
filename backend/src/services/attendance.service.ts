import { AttendanceStatus } from "../../generated/prisma/enums";
import { prisma } from "../../prisma/prisma"
import { endOfDayJakarta, hourJakarta, startOfDayJakarta } from "../lib/date";

export const attendanceService = {
    async checkIn(userId: number) {
        const employee = await prisma.employee.findUnique({
            where: { userId },
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        const startOfDay = startOfDayJakarta();
        const endOfDay = endOfDayJakarta();
        const checkIn = new Date();

        const existingAttendance = await prisma.attendance.findFirst({
            where: {
                employeeId: employee.id,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        if (existingAttendance) {
            if (existingAttendance.status === "LEAVE") {
                throw new Error("You are on leave today");
            }

            throw new Error("Already checked in today");
        }

        const hour = hourJakarta();

        let status: AttendanceStatus;

        if (hour >= 18) {
            status = "ABSENT";
        } else if (hour >= 8) {
            status = "LATE";
        } else {
            status = "PRESENT";
        }

        return prisma.attendance.create({
            data: {
                employeeId: employee.id,
                date: startOfDay,
                checkIn: hour >= 18 ? null : checkIn,
                status,
            },
        });
    },

    async checkOut(userId: number) {
        const employee = await prisma.employee.findUnique({
            where: { userId },
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        const startOfDay = startOfDayJakarta();
        const endOfDay = endOfDayJakarta();

        const attendance = await prisma.attendance.findFirst({
            where: {
                employeeId: employee.id,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        if (!attendance) {
            throw new Error("You have not checked in today");
        }

        if (attendance.status === "LEAVE") {
            throw new Error("You are on leave today");
        }

        if (attendance.checkOut) {
            throw new Error("Already checked out today");
        }

        return prisma.attendance.update({
            where: {
                id: attendance.id,
            },
            data: {
                checkOut: new Date(),
            },
        });
    },

    async getAll() {
        return prisma.attendance.findMany({
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
                date: "desc",
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

        return prisma.attendance.findMany({
            where: {
                employeeId: employee.id,
            },
            orderBy: {
                date: "desc",
            },
        });
    },

    async checkAttendance() {
        const hour = hourJakarta();

        if (hour < 18) {
            throw new Error("Attendance can only be checked after 18:00");
        }

        const startOfDay = startOfDayJakarta();
        const endOfDay = endOfDayJakarta();

        const employees = await prisma.employee.findMany({
            select: {
                id: true,
            },
        });

        const attendances = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: {
                employeeId: true,
            },
        });

        const attendedEmployeeIds = new Set(
            attendances.map((attendance) => attendance.employeeId),
        );

        const absentEmployees = employees.filter(
            (employee) => !attendedEmployeeIds.has(employee.id),
        );

        if (absentEmployees.length === 0) {
            return {
                count: 0,
                message: "All employees have attendance",
            };
        }

        await prisma.attendance.createMany({
            data: absentEmployees.map((employee) => ({
                employeeId: employee.id,
                date: startOfDay,
                checkIn: null,
                checkOut: null,
                status: "ABSENT" as const,
            })),
            skipDuplicates: true,
        });

        return {
            count: absentEmployees.length,
            message: "Attendance checked successfully",
        };
    },


}