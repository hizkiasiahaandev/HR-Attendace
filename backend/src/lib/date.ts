import { fromZonedTime, formatInTimeZone } from "date-fns-tz";

export const TIMEZONE = "Asia/Jakarta";

export function nowJakarta() {
    return new Date();
}

export function startOfDayJakarta() {
    const date = formatInTimeZone(
        new Date(),
        TIMEZONE,
        "yyyy-MM-dd"
    );

    return fromZonedTime(
        `${date} 00:00:00`,
        TIMEZONE
    );
}

export function endOfDayJakarta() {
    const date = formatInTimeZone(
        new Date(),
        TIMEZONE,
        "yyyy-MM-dd"
    );

    return fromZonedTime(
        `${date} 23:59:59.999`,
        TIMEZONE
    );
}

export function hourJakarta() {
    return Number(
        formatInTimeZone(new Date(), TIMEZONE, "H")
    );
}

export function parseDateFromJakarta(date: string) {
    return fromZonedTime(
        `${date} 00:00:00`,
        TIMEZONE,
    );
}

export function parseDateToJakarta(date: string) {
    return fromZonedTime(
        `${date} 23:59:59.999`,
        TIMEZONE,
    );
}

export function formatDateJakarta(date: Date) {
    return formatInTimeZone(
        date,
        TIMEZONE,
        "yyyy-MM-dd",
    );
}

export function formatTimeJakarta(date: Date) {
    return formatInTimeZone(
        date,
        TIMEZONE,
        "HH:mm:ss",
    );
}