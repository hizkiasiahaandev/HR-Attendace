import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/auth/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import EmployeeDashboard from "@/pages/employee/Dashboard";
import AdminLayout from "@/components/AdminLayout";
import EmployeeLayout from "@/components/EmployeeLayout";
import Departments from "@/pages/admin/Departments";
import Attendance from "@/pages/admin/Attendance";
import LeaveRequests from "@/pages/admin/LeaveRequests";
import AttendanceEmployees from "@/pages/employee/Attendance";
import LeaveRequestsEmployees from "@/pages/employee/LeaveRequests";
import ManageEmployees from "@/pages/admin/Employees";
import ProfileEmployee from "@/pages/employee/Profile";
import AdminSetting from "@/pages/admin/Settings";
import Reports from "@/pages/admin/Reports";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<ManageEmployees />} />
                <Route path="departments" element={<Departments />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="leave-requests" element={<LeaveRequests />} />
                <Route path="reports" element={<Reports />} /> 
                <Route path="settings" element={<AdminSetting />} />
            </Route>
            <Route path="/employee" element={<EmployeeLayout />}>
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="attendance"  element={<AttendanceEmployees />} />
                <Route path="leave-requests" element={<LeaveRequestsEmployees />} />
                <Route path="profile" element={<ProfileEmployee />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}