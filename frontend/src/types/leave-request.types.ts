export interface CreateLeaveRequestInput {
    startDate: Date;
    endDate: Date;
    reason: string;
}

export interface LeaveRequest {
    id: number;
    startDate: string;
    endDate: string;
    reason: string;
    status: "PENDING" | "APPROVED" | "REJECTED";

    employee: {
        employeeCode: string;
        fullName: string;
        position: string;
        department: {
            name: string;
        };
    };
}