import { useEffect, useState } from "react";
import Avatar from "react-avatar";

import { leaveRequestService } from "@/services/leave-request.service";
import type { LeaveRequest } from "@/types/leave-request.types";
import { FiClock, FiCheck, FiX, FiSearch, FiInbox } from "react-icons/fi";
import { formatDate } from "@/lib/date";

export default function LeaveRequests() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getLeaveRequests = async () => {
            const data = await leaveRequestService.getAll();

            setLeaveRequests(data.data);
        };

        getLeaveRequests();
    }, []);

    const filteredRequests = leaveRequests.filter(
        (request) =>
            request.employee.fullName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            request.employee.employeeCode
                .toLowerCase()
                .includes(search.toLowerCase()),
    );

    const handleApprove = async (id: number) => {
        await leaveRequestService.approve(id);

        setLeaveRequests((prev) =>
            prev.map((request) =>
                request.id === id
                    ? { ...request, status: "APPROVED" }
                    : request,
            ),
        );
    };

    const handleReject = async (id: number) => {
        await leaveRequestService.reject(id);

        setLeaveRequests((prev) =>
            prev.map((request) =>
                request.id === id
                    ? { ...request, status: "REJECTED" }
                    : request,
            ),
        );
    };

    const pendingCount = leaveRequests.filter(
        (request) => request.status === "PENDING",
    ).length;

    const approvedCount = leaveRequests.filter(
        (request) => request.status === "APPROVED",
    ).length;

    const rejectedCount = leaveRequests.filter(
        (request) => request.status === "REJECTED",
    ).length;

    const leaveRequestColumns = [
        "Employee",
        "Employee Code",
        "Position",
        "Department",
        "Start Date",
        "End Date",
        "Reason",
        "Status",
        "Action",
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    Leave Requests
                </h2>

                <p className="ext-sm text-gray-500">
                    Manage employee leave requests
                </p>
            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border shadow-sm bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiClock size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Pending
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {pendingCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border shadow-sm bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiCheck size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Approved
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {approvedCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border shadow-sm bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiX size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Rejected
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {rejectedCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="overflow-hidden rounded-xl shadow-sm border bg-white">

                <div className="border-b p-4">
                    <div className="relative max-w-sm">
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
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-275">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                {leaveRequestColumns.map((col) => (
                                    <th
                                        key={col}
                                        className={`px-5 py-3 text-xs text-left whitespace-nowrap font-semibold uppercase tracking-wide text-gray-500 ${col === "Action" ? "text-right" : ""
                                            }`}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >

                                    <td className="px-5 whitespace-nowrap py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={request.employee.fullName}
                                                size="40"
                                                round
                                                fgColor="white"
                                                className="shadow-sm"
                                                textSizeRatio={3}
                                            />

                                            <p className="text-sm font-medium text-gray-900">
                                                {request.employee.fullName}
                                            </p>
                                        </div>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {request.employee.employeeCode}
                                        </p>
                                    </td>


                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-700">
                                            {request.employee.position}
                                        </p>
                                    </td>


                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-600">
                                            {request.employee.department.name}
                                        </p>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatDate(request.startDate)}
                                        </p>
                                    </td>


                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatDate(request.endDate)}
                                        </p>
                                    </td>


                                    <td className="max-w-55 px-5 py-4">
                                        <p
                                            className="truncate text-sm text-gray-600"
                                            title={request.reason}
                                        >
                                            {request.reason}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                            {request.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        {request.status === "PENDING" ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleApprove(
                                                            request.id,
                                                        )
                                                    }
                                                    title="Approve"
                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    <FiCheck size={16} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleReject(
                                                            request.id,
                                                        )
                                                    }
                                                    title="Reject"
                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    <FiX size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="block text-right text-xs text-gray-400">
                                                ---
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredRequests.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <FiInbox className="mx-auto mb-3 text-gray-300" size={40} />

                        <p className="text-sm font-medium text-gray-500">
                            No leave requests found.
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            There are no leave requests to display.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}