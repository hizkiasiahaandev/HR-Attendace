import { useEffect, useState } from "react";
import { leaveRequestService } from "@/services/leave-request.service";
import type { LeaveRequest } from "@/types/employees/leave-request.types";
import { FiPlus, FiFileText, FiClock, FiCalendar, FiSend } from "react-icons/fi";
import { formatDate } from "@/lib/date";
import type { Attendance } from "@/types/employees/attendance.types";
import { attendanceService } from "@/services/attendance.service";

export default function LeaveRequestsEmployees() {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [attendances, setAttendances] = useState<Attendance[]>([]);

    const [form, setForm] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });

    useEffect(() => {
        const getAttendance = async () => {
            const data = await attendanceService.getMy();

            setAttendances(data.data);
        };

        getAttendance();
    }, []);

    const today = new Date().toDateString();

    const todayAttendance = attendances.find(
        (attendance) =>
            new Date(attendance.date).toDateString() === today,
    );

    const handleRequestLeave = () => {
        if (todayAttendance) {
            if (
                todayAttendance.status === "PRESENT" ||
                todayAttendance.status === "LATE"
            ) {
                alert("You have already checked in today. You cannot request leave for today.");
                return;
            }

            if (todayAttendance.status === "LEAVE") {
                alert("You are already on leave today.");
                return;
            }

            if (todayAttendance.status === "ABSENT") {
                alert("You are already marked as absent today.");
                return;
            }
        }

        setShowForm(!showForm);
    };

    useEffect(() => {
        const getLeaveRequests = async () => {
            try {
                const data = await leaveRequestService.getMy();

                setLeaveRequests(data.data);
            } finally {
                setLoading(false);
            }
        };

        getLeaveRequests();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = await leaveRequestService.create({
            startDate: new Date(form.startDate),
            endDate: new Date(form.endDate),
            reason: form.reason,
        });

        setLeaveRequests((prev) => [data.data, ...prev]);

        setForm({
            startDate: "",
            endDate: "",
            reason: "",
        });

        setShowForm(false);
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Leave Requests
                    </h2>

                    <p className="text-sm text-gray-500">
                        Manage your leave requests
                    </p>
                </div>

                <button
                    onClick={handleRequestLeave}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    <FiPlus size={16} />
                    Request Leave
                </button>
            </div>

            {showForm && (
                <div className="rounded-xl border bg-white p-6">
                    <div className="mb-5">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                                New Leave Request
                            </h3>
                        </div>

                        <p className="text-sm text-gray-500">
                            Fill in the details below to submit your leave request.
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={form.startDate}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            startDate: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    value={form.endDate}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            endDate: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Reason
                            </label>

                            <textarea
                                value={form.reason}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        reason: e.target.value,
                                    })
                                }
                                required
                                rows={4}
                                placeholder="Enter your reason..."
                                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                <FiSend size={16} />
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            )}


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
                                {loading ? "---" : pendingCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border shadow-sm bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiCalendar size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Approved
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {loading ? "---" : approvedCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border shadow-sm bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            <FiFileText size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Rejected
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-gray-900">
                                {loading ? "---" : rejectedCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border shadow-sm bg-white">
                <div className="border-b px-5 py-4">
                    <h3 className="font-semibold text-gray-900">
                        My Leave Requests
                    </h3>
                    <p className="text-sm text-gray-500">
                        View and track your submitted leave requests.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-175">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Start Date
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    End Date
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Reason
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaveRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {formatDate(request.startDate)}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {formatDate(request.endDate)}
                                    </td>

                                    <td className="max-w-75 px-5 py-4 text-sm text-gray-600">
                                        {request.reason}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!loading && leaveRequests.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <p className="text-sm text-gray-500">
                            No leave requests found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};