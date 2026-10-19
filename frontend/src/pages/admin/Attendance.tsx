import { useEffect, useState } from "react";
import { attendanceService } from "@/services/attendance.service";
import Avatar from "react-avatar";
import { FiCalendar, FiCheckCircle, FiClock, FiLock, FiSearch } from "react-icons/fi";
import type { Attendance } from "@/types/attendace.types";
import { formatDate } from "@/lib/date";
import axios from "axios";
import type { ApiError } from "@/types/api";

export default function Attendance() {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getAttendances = async () => {
            const data = await attendanceService.getAll();

            setAttendances(data.data);
        };

        getAttendances();
    }, []);

    const filteredAttendances = attendances.filter(
        (attendance) =>
            attendance.employee.fullName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            attendance.employee.employeeCode
                .toLowerCase()
                .includes(search.toLowerCase()),
    );

    const handleCheckAttendance = async () => {
        try {
            const result = await attendanceService.checkAttendance();

            alert(result.message);
            const data = await attendanceService.getAll();
            setAttendances(data.data);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                alert(error.response?.data.message || "Failed to check attendace");
            } else {
                alert("Something went wrong");
            }
        }
    }

    const titles = [
        "Employee",
        "Employee Code",
        "Position",
        "Department",
        "Date",
        "Check In",
        "Check Out",
        "Status",
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    Attendance
                </h2>

                <p className="text-sm text-gray-500">
                    Monitor employee attendance
                </p>
            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiCalendar size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Attendance
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {attendances.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white shadow-sm p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiClock size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Present
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {
                                    attendances.filter(
                                        (attendance) =>
                                            attendance.status === "PRESENT",
                                    ).length
                                }
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
                                {
                                    attendances.filter(
                                        (attendance) =>
                                            attendance.status === "LATE",
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiCalendar size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Absent
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {
                                    attendances.filter(
                                        (attendance) =>
                                            attendance.status === "ABSENT",
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>



            <div className="overflow-hidden rounded-xl border bg-white">
                <div className="flex items-center justify-between border-b p-4">
                    <div className="relative max-w-sm flex-1">
                        <FiSearch
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            id="search-employee"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2.5 pl-9 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <button
                        onClick={handleCheckAttendance}
                        className="ml-4 flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        <FiCheckCircle size={16} />
                        Check Attendance
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-200">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                {titles.map((title) => (
                                    <th
                                        key={title}
                                        className="px-5 whitespace-nowrap py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                                    >
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAttendances.map((attendance) => (
                                <tr
                                    key={attendance.id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >

                                    <td className="px-5 whitespace-nowrap py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={attendance.employee.fullName}
                                                size="40"
                                                round
                                                fgColor="white"
                                                textSizeRatio={3}
                                            />

                                            <p className="text-sm font-medium text-gray-900">
                                                {attendance.employee.fullName}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {attendance.employee.employeeCode}
                                        </p>
                                    </td>


                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-700">
                                            {attendance.employee.position}
                                        </p>
                                    </td>


                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-600">
                                            {attendance.employee.department.name}
                                        </p>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatDate(attendance.date)}
                                        </p>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {attendance.checkIn
                                                ? new Date(
                                                    attendance.checkIn,
                                                ).toLocaleTimeString("id-ID", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : "---"}
                                        </p>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {attendance.checkOut
                                                ? new Date(
                                                    attendance.checkOut,
                                                ).toLocaleTimeString("id-ID", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : "---"}
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

                {filteredAttendances.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <FiLock className="mx-auto mb-3 text-gray-300" size={40} />
                        <p className="text-sm text-gray-500">
                            No attendance records found.
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            There are no leave attendances to display.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}