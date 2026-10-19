export interface Attendance {
    id: number;
    date: string;
    checkIn: string | null;
    checkOut: string | null;
    status: "PRESENT" | "LATE" | "ABSENT" | "LEAVE";
}
