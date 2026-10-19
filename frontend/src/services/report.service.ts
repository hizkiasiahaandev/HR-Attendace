import api from "@/lib/api";
import type { AttendanceReportParams } from "@/types/report.types";


export const reportService = {
    async downloadAttendanceReport(params?: AttendanceReportParams) {
        const response = await api.get("/reports/attendance", {
            params,
            responseType: "blob",
        });

        return response.data;
    },
};