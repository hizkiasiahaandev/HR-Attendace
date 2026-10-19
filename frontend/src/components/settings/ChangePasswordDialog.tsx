import { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { Dialog, DialogHeader, DialogClose, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ChangePasswordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: {
        currentPassword: string;
        newPassword: string;
    }) => Promise<void>;
}

export default function ChangePasswordDialog({
    open,
    onOpenChange,
    onSubmit,
}: ChangePasswordDialogProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword || !newPassword) {
            return;
        }

        try {
            setLoading(true);

            await onSubmit({
                currentPassword,
                newPassword,
            });

            setCurrentPassword("");
            setNewPassword("");
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>

                    <DialogDescription>
                        Update your account password.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                            Current Password
                        </Label>

                        <div className="relative">
                            <FiLock
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <Input
                                id="currentPassword"
                                type={
                                    showCurrentPassword
                                        ? "text"
                                        : "password"
                                }
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                placeholder="Enter current password"
                                className="pr-10 py-5 pl-9"
                                autoComplete="current-password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCurrentPassword(
                                        !showCurrentPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showCurrentPassword ? (
                                    <FiEyeOff size={16} />
                                ) : (
                                    <FiEye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">
                            New Password
                        </Label>

                        <div className="relative">
                            <FiLock
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <Input
                                id="newPassword"
                                type={
                                    showNewPassword
                                        ? "text"
                                        : "password"
                                }
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                                className="pr-10 py-5 pl-9"
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNewPassword ? (
                                    <FiEyeOff size={16} />
                                ) : (
                                    <FiEye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                !currentPassword ||
                                !newPassword
                            }
                        >
                            <FiCheck size={16} />
                            {loading ? "Changing..." : "Change Password"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}