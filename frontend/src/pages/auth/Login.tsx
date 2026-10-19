import { authService } from "@/services/auth.service";
import type { ApiError } from "@/types/api";
import axios from "axios";
import { useState, type FormEvent } from "react";
import { FaFingerprint } from "react-icons/fa";
import { FiAlertCircle, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi"
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setError("");

        try {
            const result = await authService.login({
                email,
                password
            });

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            if (result.user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/employee/dashboard");
            }
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                 setError(error.response?.data.message || "Terjadi Kesalahan")
            } else{
                setError("Terjadi Kesalahan");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="rounded-xl border bg-white p-8 shadow-lg">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-black text-white">
                            <FaFingerprint size={28} />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight">
                            Attendify
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Employee attendance management system
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">
                            Sign in
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Enter your account to continue
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                autoComplete="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="contoh@gmail.com"
                                className="w-full rounded-md border px-3 py-2.5 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full rounded-md border px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={18} />
                                    ) : (
                                        <FiEye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 text-sm text-red-500">
                                <FiAlertCircle size={16} />
                                <p>{error}</p>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-md bg-black py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            <FiLogIn size={18} />
                            Sign in
                        </button>
                    </form>

                    <div className="mt-8 border-t pt-5 text-center">
                        <p className="text-sm font-medium text-gray-700">
                            Attendify
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                            © 2026 Attendify. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};