import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar
                role="ADMIN"
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Header
                    onMenuClick={() => setSidebarOpen(true)}
                    title="Admin Dashboard"
                />

                <main className="min-h-0 flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}