import { FiPlus, FiSave } from "react-icons/fi";
import type { Employee, CreateEmployeeInput } from "@/types/employees.types";
import { useEffect, useState } from "react";
import type { Department } from "@/types/department.types";
import { departmentService } from "@/services/department.service";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface EmployeeFormProps {
    form: CreateEmployeeInput;
    setForm: React.Dispatch<React.SetStateAction<CreateEmployeeInput>>;
    editingEmployee: Employee | null;
    handleSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export default function EmployeeForm({
    form,
    setForm,
    editingEmployee,
    handleSubmit,
    onCancel,
}: EmployeeFormProps) {
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        const geyDepartments = async () => {
            const result = await departmentService.getAll();
            setDepartments(result.data);
        };

        geyDepartments();
    }, []);

    return (
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    {editingEmployee ? "Edit Employee" : "Add Employee"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {editingEmployee
                        ? "Update employee information."
                        : "Fill in the details below to create a new employee."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="employeeCode"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Employee Code
                        </label>

                        <input
                            id="employeeCode"
                            name="employeeCode"
                            type="text"
                            autoComplete="off"
                            value={form.employeeCode}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    employeeCode: e.target.value,
                                })
                            }
                            placeholder="EMP001"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="fullName"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>

                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            value={form.fullName}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fullName: e.target.value,
                                })
                            }
                            placeholder="John Doe"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                            placeholder="john@example.com"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={
                                editingEmployee
                                    ? "current-password"
                                    : "new-password"
                            }
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                            placeholder={
                                editingEmployee
                                    ? "Leave blank to keep current password"
                                    : "Enter password"
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                            required={!editingEmployee}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                })
                            }
                            placeholder="08123456789"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="position"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Position
                        </label>

                        <input
                            id="position"
                            name="position"
                            type="text"
                            autoComplete="organization-title"
                            value={form.position}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    position: e.target.value,
                                })
                            }
                            placeholder="Frontend Developer"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="joinDate"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Join Date
                        </label>

                        <input
                            id="joinDate"
                            name="joinDate"
                            type="date"
                            value={form.joinDate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    joinDate: e.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="departmentId"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Department
                        </label>
                        <Select
                            value={String(form.departmentId)}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    departmentId: Number(value),
                                })
                            }
                        >
                            <SelectTrigger
                                id="departmentId"
                                className="w-full"
                            >
                                <SelectValue placeholder="Select department" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Departments</SelectLabel>

                                    {departments.map((department) => (
                                        <SelectItem
                                            className="py-2"
                                            key={department.id}
                                            value={String(department.id)}
                                        >
                                            {department.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-5">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        {editingEmployee ? (
                            <>
                                <FiSave size={16} />
                                Update Employee
                            </>
                        ) : (
                            <>
                                <FiPlus size={16} />
                                Create Employee
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}