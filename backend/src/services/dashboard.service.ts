import { prisma } from "../../prisma/prisma";

export const dashboardService = {
    async getSummary() {
        const today = new Date();

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const totalEmployees = await prisma.employee.count();

        const todayAttendances = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        const presentToday = todayAttendances.filter(
            (attendance) => attendance.status === "PRESENT",
        ).length;

        const lateToday = todayAttendances.filter(
            (attendance) => attendance.status === "LATE",
        ).length;

        const absentToday = todayAttendances.filter(
            (attendance) => attendance.status === "ABSENT",
        ).length;


        const pendingLeaveRequests = await prisma.leaveRequest.count({
            where: {
                status: "PENDING",
            },
        });

        return {
            totalEmployees,
            presentToday,
            lateToday,
            absentToday,
            pendingLeaveRequests
        };
    },
};

