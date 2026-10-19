import { useEffect, useState } from "react";
import { attendanceService } from "@/services/attendance.service";
import type { Attendance } from "@/types/employees/attendance.types";
import { formatDate, formatTime, formatToday } from "@/lib/date";
import { FiCalendar, FiLogIn, FiLogOut, FiCheckCircle } from "react-icons/fi";

export default function AttendanceEmployees() {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const today = new Date().toDateString();

    const todayAttendance = attendances.find(
        (attendance) =>
            new Date(attendance.date).toDateString() === today,
    );

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

    const refreshAttendance = async () => {
        const data = await attendanceService.getMy();

        setAttendances(data.data);
    };

    const handleCheckIn = async () => {
        try {
            setProcessing(true);

            await attendanceService.checkIn();
            await refreshAttendance();
        } finally {
            setProcessing(false);
        }
    };

    const handleCheckOut = async () => {
        try {
            setProcessing(true);

            await attendanceService.checkOut();
            await refreshAttendance();
        } finally {
            setProcessing(false);
        }
    };



    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    My Attendance
                </h2>

                <p className="text-sm text-gray-500">
                    Manage and view your attendance
                </p>
            </div>


            <div className="rounded-xl shadow-sm border bg-white p-6">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <FiCalendar
                                size={18}
                                className="text-gray-500"
                            />

                            <p className="text-sm font-medium text-gray-500">
                                Today's Attendance
                            </p>
                        </div>

                        <p className="mt-2 text-xl font-semibold text-gray-900">
                            {todayAttendance?.status === "LEAVE"
                                ? "On Leave"
                                : todayAttendance?.status || "Not Checked In"}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            {formatToday()}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleCheckIn}
                            disabled={
                                processing ||
                                loading ||
                                !!todayAttendance?.checkIn ||
                                todayAttendance?.status === "ABSENT" ||
                                todayAttendance?.status === "LEAVE"
                            }
                            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            <FiLogIn size={16} />

                            {processing ? "Processing..." : "Check In"}
                        </button>

                        <button
                            onClick={handleCheckOut}
                            disabled={
                                processing ||
                                loading ||
                                !todayAttendance?.checkIn ||
                                !!todayAttendance?.checkOut
                            }
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                        >
                            <FiLogOut size={16} />
                            Check Out
                        </button>
                    </div>
                </div>


                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-gray-50 border shadow-sm p-5">
                        <div className="flex items-center gap-2">
                            <FiCheckCircle
                                size={16}
                                className="text-gray-400"
                            />

                            <p className="text-xs text-gray-400">
                                Status
                            </p>
                        </div>

                        <p className="mt-2 text-sm font-medium text-gray-900">
                            {todayAttendance?.status || "---"}
                        </p>
                    </div>

                    <div className="rounded-lg border shadow-sm bg-gray-50 p-5">
                        <div className="flex items-center gap-2">
                            <FiLogIn
                                size={16}
                                className="text-gray-400"
                            />

                            <p className="text-xs text-gray-400">
                                Check In
                            </p>
                        </div>

                        <p className="mt-2 text-sm font-medium text-gray-900">
                            {formatTime(
                                todayAttendance?.checkIn || null,
                            )}
                        </p>
                    </div>

                    <div className="rounded-lg border shadow-sm bg-gray-50 p-5">
                        <div className="flex items-center gap-2">
                            <FiLogOut
                                size={16}
                                className="text-gray-400"
                            />

                            <p className="text-xs text-gray-400">
                                Check Out
                            </p>
                        </div>

                        <p className="mt-2 text-sm font-medium text-gray-900">
                            {formatTime(
                                todayAttendance?.checkOut || null,
                            )}
                        </p>
                    </div>
                </div>
            </div>


            <div className="overflow-hidden rounded-xl border shadow-sm bg-white">
                <div className="border-b px-5 py-4">
                    <h3 className="font-semibold text-gray-900">
                        Attendance History
                    </h3>

                    <p className="text-sm text-gray-400">
                        Your recent attendance records
                    </p>
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
                            {attendances.map((attendance) => (
                                <tr
                                    key={attendance.id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatDate(
                                                attendance.date,
                                            )}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatTime(
                                                attendance.checkIn,
                                            )}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatTime(
                                                attendance.checkOut,
                                            )}
                                        </p>
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

                {!loading && attendances.length === 0 && (
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