import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { attendanceService } from "@/services/attendance.service";
import type { Attendance } from "@/types/employees/attendance.types";
import { formatDate, formatDateJakarta, formatTime } from "@/lib/date";
import { FiLogIn, FiLogOut, FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";

export default function EmployeeDashboard() {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        const getAttendance = async () => {
            try {
                const data = await attendanceService.getMy();

                setAttendances(data.data);
            } finally {
                setLoading(false);
            }
        };

        getAttendance();
    }, []);

    const today = formatDateJakarta(new Date());

    const todayAttendance = attendances.find(
        (attendance) =>
            formatDateJakarta(attendance.date) === today,
    );

    const presentCount = attendances.filter(
        (attendance) => attendance.status === "PRESENT",
    ).length;

    const lateCount = attendances.filter(
        (attendance) => attendance.status === "LATE",
    ).length;

    const totalAttendance = attendances.length;

    const recentAttendances = attendances.slice(0, 5);

    const handleCheckIn = async () => {
        await attendanceService.checkIn();

        const data = await attendanceService.getMy();

        setAttendances(data.data);
    };

    const handleCheckOut = async () => {
        await attendanceService.checkOut();
        const data = await attendanceService.getMy();
        setAttendances(data.data);
    };

    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <Avatar
                        name={user.email || "Employee"}
                        size="48"
                        round
                        textSizeRatio={3}
                        className="shadow-sm"
                    />

                    <div>
                        <p className="text-sm text-gray-500">
                            Welcome back
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900">
                            {user.email || "Employee"}
                        </h2>

                        <p className="text-sm text-gray-400">
                            Have a productive day!
                        </p>
                    </div>
                </div>
            </div>


            <div className="rounded-xl border shadow-sm bg-white p-6">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm text-gray-500">
                            Today's Attendance
                        </p>

                        <p className="text-lg font-semibold text-gray-900">
                            {todayAttendance?.status === "LEAVE"
                                ? "On Leave"
                                : todayAttendance?.status || "Not Checked In"}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Check in before 08:00 to be marked present.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCheckIn}
                            disabled={
                                Boolean(todayAttendance?.checkIn) ||
                                todayAttendance?.status === "ABSENT" ||
                                todayAttendance?.status === "LEAVE"
                            }
                            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            <FiLogIn size={16} />
                            Check In
                        </button>

                        <button
                            onClick={handleCheckOut}
                            disabled={
                                !todayAttendance?.checkIn ||
                                Boolean(todayAttendance.checkOut) ||
                                todayAttendance?.status === "ABSENT" ||
                                todayAttendance?.status === "LEAVE"
                            }
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                        >
                            <FiLogOut size={16} />
                            Check Out
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border shadow-sm bg-gray-50 p-5">
                        <p className="text-xs text-gray-400">
                            Status
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {todayAttendance?.status || "---"}
                        </p>
                    </div>

                    <div className="rounded-lg border shadow-sm bg-gray-50 p-5">
                        <p className="text-xs text-gray-400">
                            Check In
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {formatTime(
                                todayAttendance?.checkIn || null,
                            )}
                        </p>
                    </div>

                    <div className="rounded-lg border shadow-sm bg-gray-50 p-5">
                        <p className="text-xs text-gray-400">
                            Check Out
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {formatTime(
                                todayAttendance?.checkOut || null,
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border shadow-sm bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiCalendar size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Attendance
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {loading ? "---" : totalAttendance}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white shadow-sm p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiCheckCircle size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Present
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {loading ? "---" : presentCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiClock size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Late
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {loading ? "---" : lateCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="overflow-hidden rounded-xl shadow-sm  border bg-white">
                <div className="border-b px-5 py-4">
                    <div className="flex items-center gap-2">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Recent Attendance
                            </h3>

                            <p className="text-sm text-gray-500">
                                View your latest attendance records and check-in activity.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-150">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Date
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Check In
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Check Out
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentAttendances.map((attendance) => (
                                <tr
                                    key={attendance.id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {formatDate(attendance.date)}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {formatTime(attendance.checkIn)}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {formatTime(attendance.checkOut)}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                            {attendance.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {recentAttendances.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <p className="text-sm text-gray-500">
                            No attendance records found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}