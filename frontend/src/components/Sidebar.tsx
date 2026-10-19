import { NavLink } from "react-router-dom";
import {
    FaFingerprint,
} from "react-icons/fa";
import { adminMenus } from "@/types/admin.menus";
import { employeeMenus } from "@/types/employee.menus";


interface SidebarProps {
    role: "ADMIN" | "EMPLOYEE";
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
    const menus = role === "ADMIN" ? adminMenus : employeeMenus;

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r bg-white transition-transform lg:static lg:z-auto lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="flex h-16 items-center gap-3 border-b px-6">
                <div className="flex size-9 items-center justify-center rounded-lg bg-black text-white">
                    <FaFingerprint size={18} />
                </div>

                <div>
                    <h2 className="text-lg font-bold tracking-tight">
                        Attendify
                    </h2>

                    <p className="text-[11px] text-gray-400">
                        Attendance System
                    </p>
                </div>
            </div>


            <nav className="flex-1 overflow-y-auto px-3 py-5">
                {menus.map((section) => (
                    <div key={section.title} className="mb-6">
                        <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-gray-400">
                            {section.title}
                        </p>

                        <div className="space-y-1">
                            {section.items.map((menu) => {
                                const Icon = menu.icon;

                                return (
                                    <NavLink
                                        key={menu.path}
                                        to={menu.path}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive
                                                ? "bg-black text-white"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <Icon
                                                    size={17}
                                                    className={
                                                        isActive
                                                            ? "text-white"
                                                            : "text-gray-400"
                                                    }
                                                />

                                                <div className="flex flex-col">
                                                    <span>{menu.label}</span>
                                                    <span
                                                        className={`text-[11px] ${isActive ? "text-gray-300" : "text-gray-400"
                                                            }`}
                                                    >
                                                        {menu.description}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="border-t px-4 text-center py-4">
                <p className="text-sm font-medium text-gray-700">
                    Attendify
                </p>

                <p className="mt-2 text-xs text-gray-400">
                    © 2026 Attendify. All rights reserved.
                </p>
            </div>
        </aside>
    );
}