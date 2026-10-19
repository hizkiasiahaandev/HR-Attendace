export interface LeaveRequest {
    id: number;
    startDate: string;
    endDate: string;
    reason: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
}
