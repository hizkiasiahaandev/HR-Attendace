import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { FiEdit2, FiMail, FiShield } from "react-icons/fi";
import { authService } from "@/services/auth.service";
import ChangePasswordDialog from "@/components/settings/ChangePasswordDialog";

export default function AdminSetting() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {
        const getProfile = async () => {
            try {
                const result = await authService.getMeAdmin();
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

    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <Avatar
                        name="Admin"
                        size="64"
                        round
                        textSizeRatio={3}
                        className="shadow-sm"
                    />

                    <div>
                        <p className="text-sm text-gray-500">
                            Admin Profile
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Administrator
                        </h2>

                        <p className="text-sm text-gray-400">
                            System Administrator
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl border bg-white shadow-sm">
                <div className="border-b px-5 py-4">
                    <h3 className="font-semibold text-gray-900">
                        Account Information
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Your administrator account information.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Email
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiMail
                                size={16}
                                className="text-gray-400"
                            />

                            {user.email || "-"}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-gray-400">
                            Role
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiShield
                                size={16}
                                className="text-gray-400"
                            />

                            {user.role || "Guest"}
                        </div>
                    </div>
                </div>
            </div>


            <div className="rounded-xl border bg-white shadow-sm">
                <div className="border-b px-5 py-4">
                    <h3 className="font-semibold text-gray-900">
                        Security
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your administrator account security.
                    </p>
                </div>

                <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Password
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Change your password to keep your account secure.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setChangePasswordOpen(true)}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <FiEdit2 size={16} />
                        Change Password
                    </button>
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
