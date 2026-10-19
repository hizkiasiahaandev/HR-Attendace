import { FaUsers, FaBuilding, FaCalendarCheck, FaChartBar } from "react-icons/fa";
import { FiHome, FiCalendar, FiSettings } from "react-icons/fi";

export const adminMenus = [
    {
        title: "MAIN",
        items: [
            {
                label: "Dashboard",
                description: "Overview & summary",
                path: "/admin/dashboard",
                icon: FiHome,
            },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            {
                label: "Employees",
                description: "Manage employees",
                path: "/admin/employees",
                icon: FaUsers,
            },
            {
                label: "Departments",
                description: "Manage departments",
                path: "/admin/departments",
                icon: FaBuilding,
            },
        ],
    },
    {
        title: "ATTENDANCE",
        items: [
            {
                label: "Attendance",
                description: "Attendance records",
                path: "/admin/attendance",
                icon: FaCalendarCheck,
            },
            {
                label: "Leave Requests",
                description: "Review leave requests",
                path: "/admin/leave-requests",
                icon: FiCalendar,
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                label: "Reports",
                description: "Attendance reports",
                path: "/admin/reports",
                icon: FaChartBar,
            },
            {
                label: "Settings",
                description: "System settings",
                path: "/admin/settings",
                icon: FiSettings,
            },
        ],
    },
];