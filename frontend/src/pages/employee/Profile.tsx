import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { authService } from "@/services/auth.service";
import { formatDate } from "@/lib/date";
import { FiEdit2, FiUser, FiBriefcase, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import ChangePasswordDialog from "@/components/settings/ChangePasswordDialog";

export default function ProfileEmployee() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);


    useEffect(() => {
        const getProfile = async () => {
            try {
                const result = await authService.getMe();
                setProfile(result.data);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    if (loading) {
        return (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                    Failed to load profile.
                </p>
            </div>
        );
    }

    const { employee, attendanceSummary } = profile;

    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            name={employee.fullName}
                            size="64"
                            round
                            textSizeRatio={3}
                            className="shadow-sm"
                        />

                        <div>
                            <p className="text-sm text-gray-500">
                                Employee Profile
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900">
                                {employee.fullName}
                            </h2>

                            <p className="text-sm text-gray-400">
                                {employee.position}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setChangePasswordOpen(true)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        <FiEdit2 size={16} />
                        Change Password
                    </button>
                </div>
            </div>


            <div className="rounded-xl border bg-white shadow-sm">
                <div className="border-b px-5 py-4">
                    <h3 className="font-semibold text-gray-900">
                        Personal Information
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Your employee account and personal information.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Full Name
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiUser size={16} className="text-gray-400" />
                            {employee.fullName}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Employee Code
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiBriefcase
                                size={16}
                                className="text-gray-400"
                            />
                            {employee.employeeCode}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Email
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiMail size={16} className="text-gray-400" />
                            {profile.email}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Phone
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiPhone size={16} className="text-gray-400" />
                            {employee.phone || "-"}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Position
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiBriefcase
                                size={16}
                                className="text-gray-400"
                            />
                            {employee.position}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Department
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiBriefcase
                                size={16}
                                className="text-gray-400"
                            />
                            {employee.department.name}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Join Date
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiCalendar
                                size={16}
                                className="text-gray-400"
                            />
                            {formatDate(employee.joinDate)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-white shadow-sm">
                <div className="border-b px-5 py-4">
                    <h3 className="font-semibold text-gray-900">
                        Attendance Summary
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Overview of your attendance records.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
                    <div className="rounded-lg border bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Total Attendance
                        </p>

                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {attendanceSummary.totalAttendance}
                        </p>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Present
                        </p>

                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {attendanceSummary.present}
                        </p>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Late
                        </p>

                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {attendanceSummary.late}
                        </p>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Absent
                        </p>

                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {attendanceSummary.absent}
                        </p>
                    </div>
                </div>
            </div>

            <ChangePasswordDialog
                open={changePasswordOpen}
                onOpenChange={setChangePasswordOpen}
                onSubmit={async (data) => {
                    await authService.changePassword(data);
                    alert("Password changed successfully");
                }}
            />
        </div>
    );
}
