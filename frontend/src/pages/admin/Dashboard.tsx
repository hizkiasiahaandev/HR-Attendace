import { formatDate } from "@/lib/date";
import { dashboardService } from "@/services/dashboard.service";
import { leaveRequestService } from "@/services/leave-request.service";
import type { LeaveRequest } from "@/types/leave-request.types";
import { useEffect, useState } from "react";
import { FiUsers, FiUserCheck, FiClock, FiUserX, FiCalendar, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [dashboard, setDashboard] = useState({
        totalEmployees: 0,
        presentToday: 0,
        lateToday: 0,
        absentToday: 0,
        pendingLeaveRequests: 0,
    });

    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getLeaveRequests = async () => {
            const data = await leaveRequestService.getAll();

            setLeaveRequests(data.data);
        };

        getLeaveRequests();
    }, []);

    useEffect(() => {
        const getDashboard = async () => {
            const data = await dashboardService.getSummary();

            setDashboard(data.data);
        };

        getDashboard();
    }, []);

    const pendingRequests = leaveRequests.filter(
        (request) => request.status === "PENDING"
    );
    const stats = [
        {
            label: "Total Employees",
            value: dashboard.totalEmployees ?? 0,
            description: "Active employees",
            icon: FiUsers,
        },
        {
            label: "Present Today",
            value: dashboard.presentToday ?? 0,
            description: "Employees present",
            icon: FiUserCheck,
        },
        {
            label: "Late Today",
            value: dashboard.lateToday ?? 0,
            description: "Arrived late",
            icon: FiClock,
        },
        {
            label: "Absent Today",
            value: dashboard.absentToday ?? 0,
            description: "No attendance",
            icon: FiUserX,
        },
    ];

    const presentPercentage =
        dashboard.totalEmployees > 0
            ? (dashboard.presentToday / dashboard.totalEmployees) * 100
            : 0;

    const latePercentage =
        dashboard.totalEmployees > 0
            ? (dashboard.lateToday / dashboard.totalEmployees) * 100
            : 0;

    const absentPercentage =
        dashboard.totalEmployees > 0
            ? (dashboard.absentToday / dashboard.totalEmployees) * 100
            : 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    Dashboard Overview
                </h2>

                <p className="text-sm text-gray-500">
                    Monitor employee attendance and leave requests.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="rounded-xl border bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {stat.label}
                                    </p>

                                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>

                                <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                    <Icon size={20} />
                                </div>
                            </div>

                            <p className="mt-3 text-xs text-gray-400">
                                {stat.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Today's Attendance
                            </h3>

                            <p className="text-sm text-gray-500">
                                Employee attendance summary
                            </p>
                        </div>

                        <FiCalendar
                            size={20}
                            className="text-gray-400"
                        />
                    </div>

                    <div className="mt-6 space-y-4">
                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-gray-600">
                                    Present
                                </span>

                                <span className="font-medium text-gray-900">
                                    {dashboard.presentToday} employees
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-gray-100">
                                <div
                                    className="h-2 rounded-full bg-black"
                                    style={{ width: `${presentPercentage}%` }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-gray-600">
                                    Late
                                </span>

                                <span className="font-medium text-gray-900">
                                    {dashboard.lateToday} employees
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-gray-100">
                                <div
                                    className="h-2 rounded-full bg-gray-400"
                                    style={{ width: `${latePercentage}%` }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-gray-600">
                                    Absent
                                </span>

                                <span className="font-medium text-gray-900">
                                    {dashboard.absentToday} employees
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-gray-100">
                                <div
                                    className="h-2 rounded-full bg-gray-200"
                                    style={{ width: `${absentPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Leave Requests
                            </h3>

                            <p className="text-sm text-gray-500">
                                Pending approval
                            </p>
                        </div>

                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                            {dashboard.pendingLeaveRequests} Pending
                        </span>
                    </div>

                    <div className="mt-6 space-y-4">
                        {pendingRequests.slice(0, 4).map((request) => (
                            <div
                                key={request.id}
                                className="flex items-center justify-between border-b pb-4"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {request.employee.fullName}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {formatDate(request.startDate)} - {formatDate(request.endDate)}
                                    </p>
                                </div>

                                <span className="text-xs text-gray-500">
                                    {request.status}
                                </span>
                            </div>
                        ))}

                        <button
                            onClick={() => navigate("/admin/leave-requests")}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                        >
                            View all requests
                            <FiArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
