
import { useEffect, useMemo, useState } from "react";
import Avatar from "react-avatar";
import { FiDownload, FiFileText, FiSearch } from "react-icons/fi";
import axios from "axios";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { attendanceService } from "@/services/attendance.service";
import { reportService } from "@/services/report.service";
import type { Attendance } from "@/types/attendace.types";
import { formatDate, formatTime } from "@/lib/date";
import type { ApiError } from "@/types/api";

type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "LEAVE";

export default function Reports() {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [search, setSearch] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [status, setStatus] = useState<AttendanceStatus | "ALL">("ALL");
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const getAttendances = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await attendanceService.getAll();
                setAttendances(result.data);
            } catch (error) {
                if (axios.isAxiosError<ApiError>(error)) {
                    setError(
                        error.response?.data.message ||
                        "Failed to load attendance records.",
                    );
                } else {
                    setError("Something went wrong while loading attendance.");
                }
            } finally {
                setLoading(false);
            }
        };

        getAttendances();
    }, []);

    const filteredAttendances = useMemo(() => {
        return attendances.filter((attendance) => {
            const matchesSearch = attendance.employee.fullName
                .toLowerCase()
                .includes(search.trim().toLowerCase());

            const attendanceDate = attendance.date.slice(0, 10);
            const matchesFrom = !from || attendanceDate >= from;
            const matchesTo = !to || attendanceDate <= to;
            const matchesStatus =
                status === "ALL" || attendance.status === status;

            return (
                matchesSearch &&
                matchesFrom &&
                matchesTo &&
                matchesStatus
            );
        });
    }, [attendances, search, from, to, status]);

    const handleDownload = async () => {
        try {
            setDownloading(true);
            setError("");

            const blob = await reportService.downloadAttendanceReport({
                ...(search.trim() && { search: search.trim() }),
                ...(from && { from }),
                ...(to && { to }),
                ...(status !== "ALL" && { status }),
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "attendance-report.xlsx";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                setError(
                    error.response?.data.message ||
                    "Failed to download attendance report.",
                );
            } else {
                setError("Something went wrong while downloading the report.");
            }
        } finally {
            setDownloading(false);
        }
    };

    const handleReset = () => {
        setSearch("");
        setFrom("");
        setTo("");
        setStatus("ALL");
        setError("");
    };

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
                    Reports
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    View, filter, and download employee attendance reports.
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-gray-900">
                            <FiFileText size={18} />
                            Attendance Report
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                            Filter attendance records and export them to Excel.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleDownload}
                        disabled={downloading || loading}
                        className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FiDownload size={17} />
                        {downloading ? "Downloading..." : "Download Excel"}
                    </button>
                </div>

                <div className="space-y-5 p-5">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                            Filter Records
                        </h4>
                        <p className="mt-1 text-xs text-gray-500">
                            Search by employee name or narrow the results by
                            date and status.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                htmlFor="report-search"
                                className="text-sm font-medium text-gray-700"
                            >
                                Employee Name
                            </label>

                            <div className="relative">
                                <FiSearch
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    id="report-search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search employee name..."
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Attendance Status
                            </label>

                            <Select
                                value={status}
                                onValueChange={(value) =>
                                    setStatus(value as AttendanceStatus | "ALL")
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Attendance Status</SelectLabel>

                                        <SelectItem value="ALL">All Statuses</SelectItem>
                                        <SelectItem value="PRESENT">Present</SelectItem>
                                        <SelectItem value="LATE">Late</SelectItem>
                                        <SelectItem value="ABSENT">Absent</SelectItem>
                                        <SelectItem value="LEAVE">Leave</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="report-from"
                                className="text-sm font-medium text-gray-700"
                            >
                                From Date
                            </label>
                            <Input
                                id="report-from"
                                type="date"
                                value={from}
                                max={to || undefined}
                                onChange={(event) => setFrom(event.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="report-to"
                                className="text-sm font-medium text-gray-700"
                            >
                                To Date
                            </label>
                            <Input
                                id="report-to"
                                type="date"
                                value={to}
                                min={from || undefined}
                                onChange={(event) => setTo(event.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            Showing {filteredAttendances.length} of{" "}
                            {attendances.length} attendance records.
                        </p>

                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={downloading}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-225">
                        <thead>
                            <tr className="border-y bg-gray-50">
                                {titles.map((title) => (
                                    <th
                                        key={title}
                                        className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                                    >
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={titles.length}
                                        className="px-5 py-12 text-center text-sm text-gray-500"
                                    >
                                        Loading attendance records...
                                    </td>
                                </tr>
                            ) : (
                                filteredAttendances.map((attendance) => (
                                    <tr
                                        key={attendance.id}
                                        className="border-b last:border-0 hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-5 py-4">
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

                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                            {attendance.employee.employeeCode}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                                            {attendance.employee.position}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                            {attendance.employee.department.name}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                            {formatDate(attendance.date)}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                            {formatTime(attendance.checkIn)}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                                            {formatTime(attendance.checkOut)}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4">
                                            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                                {attendance.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && filteredAttendances.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <FiFileText
                            className="mx-auto mb-3 text-gray-300"
                            size={40}
                        />
                        <p className="text-sm font-medium text-gray-700">
                            No attendance records found.
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            Try changing your search or filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}