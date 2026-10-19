import { FaCalendarCheck, FaUsers } from "react-icons/fa";
import { FiHome, FiCalendar } from "react-icons/fi";

export const employeeMenus = [
    {
        title: "MAIN",
        items: [
            {
                label: "Dashboard",
                description: "Overview & summary",
                path: "/employee/dashboard",
                icon: FiHome,
            },
        ],
    },
    {
        title: "ATTENDANCE",
        items: [
            {
                label: "My Attendance",
                description: "View attendance history",
                path: "/employee/attendance",
                icon: FaCalendarCheck,
            },
            {
                label: "Leave Requests",
                description: "Manage leave requests",
                path: "/employee/leave-requests",
                icon: FiCalendar,
            },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                label: "My Profile",
                description: "View your profile",
                path: "/employee/profile",
                icon: FaUsers,
            },
        ],
    },
];