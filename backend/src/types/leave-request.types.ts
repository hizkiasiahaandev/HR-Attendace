export interface CreateLeaveRequestInput {
    userId: number;
    startDate: Date;
    endDate: Date;
    reason: string;
}
