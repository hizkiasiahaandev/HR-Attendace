export interface AttendanceReportParams {
    search?: string;
    from?: string;
    to?: string;
    status?: "PRESENT" | "LATE" | "ABSENT" | "LEAVE";
}
