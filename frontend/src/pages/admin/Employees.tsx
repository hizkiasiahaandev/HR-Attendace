import { employesServices } from "@/services/employee.service";
import { type CreateEmployeeInput, type Employee, type PaginationMeta, type UpdateEmployeeInput } from "@/types/employees.types";
import Avatar from "react-avatar";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/lib/date";
import { FiPlus, FiUsers, FiSearch, FiEdit2, FiMoreHorizontal } from "react-icons/fi";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ManageEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [form, setForm] = useState<CreateEmployeeInput>({
        employeeCode: "",
        fullName: "",
        email: "",
        password: "",
        phone: "",
        position: "",
        joinDate: "",
        departmentId: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingEmployee) {
            const data: UpdateEmployeeInput = {
                employeeCode: form.employeeCode,
                fullName: form.fullName,
                email: form.email,
                password: form.password || undefined,
                phone: form.phone,
                position: form.position,
                joinDate: new Date(form.joinDate),
                departmentId: form.departmentId,
            };

            await employesServices.update(editingEmployee.id, data);

            setEditingEmployee(null);
            setShowForm(false);
            setPage(1);
            await getEmployees();

            return;
        }

        const data: CreateEmployeeInput = {
            employeeCode: form.employeeCode,
            fullName: form.fullName,
            email: form.email,
            password: form.password,
            phone: form.phone,
            position: form.position,
            joinDate: form.joinDate,
            departmentId: form.departmentId,
        };

        await employesServices.create(data);

        setForm({
            employeeCode: "",
            fullName: "",
            email: "",
            password: "",
            phone: "",
            position: "",
            joinDate: "",
            departmentId: 0,
        });

        setShowForm(false);
        setPage(1);
        await getEmployees();
    };

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState<PaginationMeta>({
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 0,
    });

    const getEmployees = async () => {
        const result = await employesServices.paginate({
            page,
            limit: 10,
            search,
        });

        setEmployees(result.data);
        setPagination(result.pagination);
    };

    useEffect(() => {
        getEmployees();
    }, [page, search]);

    const employeeColumns = [
        "Employee",
        "Email",
        "Employee Code",
        "Position",
        "Department",
        "Join Date",
        "Action",
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Employees
                    </h2>

                    <p className="text-sm text-gray-500">
                        Manage employee information and accounts.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingEmployee(null);
                        setForm({
                            employeeCode: "",
                            fullName: "",
                            email: "",
                            password: "",
                            phone: "",
                            position: "",
                            joinDate: "",
                            departmentId: 0,
                        })
                        setShowForm(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
                    <FiPlus size={17} />

                    <span>Add Employee</span>
                </button>
            </div>

            {showForm && (
                <EmployeeForm
                    form={form}
                    setForm={setForm}
                    editingEmployee={editingEmployee}
                    handleSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingEmployee(null);
                    }}
                />
            )}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <FiUsers size={20} />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Employees
                        </p>

                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {pagination.total}
                        </p>
                    </div>
                </div>
            </div>
            <div className="rounded-xl border bg-white shadow-sm">

                <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            Employee List
                        </h3>

                        <p className="text-sm text-gray-500">
                            View and manage all employees.
                        </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <FiSearch
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1)
                            }}
                            id="search-employee"
                            placeholder="Search employee..."
                            className="w-full rounded-lg border px-3 py-2.5 pl-9 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-225 text-left">
                        <thead>
                            <tr className="border-b whitespace-nowrap bg-gray-50">
                                {employeeColumns.map((col) => (
                                    <th
                                        key={col}
                                        className={`px-5 py-3 text-left font-semibold text-xs uppercase tracking-wide text-gray-500 ${col === "Action" ? "text-right" : ""
                                            }`}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >
                                    <td className="px-5 whitespace-nowrap py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={employee.fullName}
                                                size="40"
                                                round
                                                textSizeRatio={3}
                                                className="shadow-sm"
                                                fgColor="white"
                                            />

                                            <p className="text-sm font-medium text-gray-900">
                                                {employee.fullName}
                                            </p>
                                        </div>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {employee.user?.email ?? "-"}
                                        </p>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {employee.employeeCode}
                                        </p>
                                    </td>


                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-700">
                                            {employee.position}
                                        </p>
                                    </td>

                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-600">
                                            Department {employee.departmentId}
                                        </p>
                                    </td>

                                    <td className="px-5 whitespace-nowrap py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatDate(employee.joinDate)}
                                        </p>
                                    </td>


                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingEmployee(employee);
                                                    setForm({
                                                        employeeCode: employee.employeeCode,
                                                        fullName: employee.fullName,
                                                        email: employee.user.email,
                                                        password: "",
                                                        phone: employee.phone ?? "",
                                                        position: employee.position,
                                                        joinDate: employee.joinDate.split("T")[0],
                                                        departmentId: employee.departmentId
                                                    });
                                                    setShowForm(true);
                                                }}
                                                title="Edit employee"
                                                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger render={<button
                                                    title="More actions"
                                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    <FiMoreHorizontal size={17} />
                                                </button>}>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-50">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel># Employee</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem disabled className="py-2 text-gray-500 text-xs font-semibold">ID: {employee.id}</DropdownMenuItem>
                                                        <DropdownMenuItem className="py-2 text-xs text-gray-500 font-semibold">Code: {employee.employeeCode}</DropdownMenuItem>
                                                        <DropdownMenuItem className="py-2 text-xs text-gray-500 font-semibold">Position : {employee.position}</DropdownMenuItem>                    
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {employees.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <FiUsers className="mx-auto text-gray-300  mb-3" size={40} />
                        <p className="text-sm text-gray-500">
                            No employee records found.
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            There are no leave employees to display.
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-medium text-gray-700">
                            {employees.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-700">
                            {pagination.total}
                        </span>{" "}
                        employees
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="rounded-lg border px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                        >
                            Previous
                        </button>


                        <span className="rounded-lg bg-black px-3 py-2 text-sm text-white">
                            {pagination.page}
                        </span>

                        <button
                            disabled={page >= pagination.totalPage}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="rounded-lg border px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
