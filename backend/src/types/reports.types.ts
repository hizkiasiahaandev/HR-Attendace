import { AttendanceStatus } from "../../generated/prisma/enums";

export const attendaceStatuses = Object.values(AttendanceStatus);
export interface AttendanceReportInput {
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
  status?: AttendanceStatus;
}