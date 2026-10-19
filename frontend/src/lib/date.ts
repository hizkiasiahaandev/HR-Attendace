import { formatInTimeZone } from "date-fns-tz";

const TIMEZONE = "Asia/Jakarta";

export const formatDate = (date: string) =>
    new Date(date)
        .toLocaleDateString("id-ID")
        .replace(/\//g, "-");

export const formatTime = (date: string | null) => {
    if (!date) return "---";

    return new Date(date).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatToday = () => {
    return new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const formatDateJakarta = (date: string | Date) =>
    formatInTimeZone(
        new Date(date),
        TIMEZONE,
        "yyyy-MM-dd"
    );