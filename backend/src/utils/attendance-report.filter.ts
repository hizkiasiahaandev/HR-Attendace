import type { Prisma } from "../../generated/prisma/client";
import { parseDateFromJakarta, parseDateToJakarta } from "../lib/date";
import type { AttendanceReportInput } from "../types/reports.types";

export const buildAttendanceWhere = (
    input: AttendanceReportInput
): Prisma.AttendanceWhereInput => {
    const { search, from, to, status } = input;

    const dateFrom = from ? parseDateFromJakarta(from) : undefined;
    const dateTo = to ? parseDateToJakarta(to) : undefined;

    return {
        ...(status && { status }),

        ...(dateFrom || dateTo
            ? {
                date: {
                    ...(dateFrom && { gte: dateFrom }),
                    ...(dateTo && { lte: dateTo }),
                },
            }
            : {}),

        ...(search && {
            employee: {
                is: {
                    fullName: {
                        contains: search,
                    },
                },
            },
        }),
    };
};