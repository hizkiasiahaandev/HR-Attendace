import { prisma } from "../../prisma/prisma";
import * as XLSX from "xlsx";
import { formatDateJakarta, formatTimeJakarta } from "../lib/date";
import type { AttendanceReportInput } from "../types/reports.types";
import { buildAttendanceWhere } from "../utils/attendance-report.filter";

export const reportService = {
    async downloadAttendanceReport(input: AttendanceReportInput) {
        const attendances = await prisma.attendance.findMany({
            where: buildAttendanceWhere(input),
            orderBy: [
                {
                    date: "desc",
                },
                {
                    employee: {
                        fullName: "asc",
                    },
                },
            ],
            include: {
                employee: {
                    include: {
                        user: {
                            select: {
                                email: true,
                            },
                        },
                        department: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        const rows = attendances.map((attendace) => ({
            "Employee Code": attendace.employee.employeeCode,
            "Full Name": attendace.employee.fullName,
            Email: attendace.employee.user.email,
            Department: attendace.employee.department.name,
            Date: formatDateJakarta(attendace.date),
            "Check In": attendace.checkIn
                ? formatTimeJakarta(attendace.checkIn)
                : "-",
            "Check Out": attendace.checkOut
                ? formatTimeJakarta(attendace.checkOut)
                : "-",
            Status: attendace.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);

        worksheet["!cols"] = [
            { wch: 18 },
            { wch: 25 },
            { wch: 30 },
            { wch: 25 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Attendace Report",
        );

        return XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx",
        });
    },
};