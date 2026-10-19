import React, { useEffect, useState } from "react";
import { FiBriefcase, FiEdit2, FiGrid, FiHash, FiMoreHorizontal, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { departmentService } from "@/services/department.service";
import type { CreateDepartmentInput, Department } from "@/types/department.types";
import Avatar from "react-avatar";
import { formatDate } from "@/lib/date";
import DepartmentForm from "@/components/departments/DepartmentForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Departments() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingDepartments, setEditingDepartments] = useState<Department | null>(null);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState<CreateDepartmentInput>({
        name: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingDepartments) {
            const data = await departmentService.update(
                editingDepartments.id,
                {
                    name: form.name,
                }
            );

            setDepartments((prev) =>
                prev.map((department) =>
                    department.id === editingDepartments.id
                        ? data.data
                        : department
                )
            );
        } else {
            const data = await departmentService.create({
                name: form.name,
            });

            setDepartments((prev) => [data.data, ...prev]);
        }

        setForm({
            name: "",
        });

        setEditingDepartments(null);
        setShowForm(false);
    };

    useEffect(() => {
        const getDepartments = async () => {
            const data = await departmentService.getAll();

            setDepartments(data.data);
        };

        getDepartments();
    }, []);

    const filteredDepartments = departments.filter((department) =>
        department.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Departments
                    </h2>

                    <p className="text-sm text-gray-500">
                        Manage employee departments
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingDepartments(null);
                        setForm({
                            name: "",
                        });
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
                    <FiPlus size={16} />
                    Add Department
                </button>
            </div>

            {showForm && (
                <DepartmentForm
                    form={form}
                    setForm={setForm}
                    editingDepartment={editingDepartments}
                    handleSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingDepartments(null);
                    }}
                />
            )}

            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <FiBriefcase size={20} />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Departments
                        </p>

                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {departments.length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white">

                <div className="border-b p-4">
                    <div className="relative max-w-sm">
                        <FiSearch
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search department..."
                            id="search-department"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2.5 pl-9 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-150">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Department
                                </th>

                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Created
                                </th>

                                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredDepartments.map((department) => (
                                <tr
                                    key={department.id}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                name={department.name}
                                                size="40"
                                                round
                                                fgColor="white"
                                                className="shadow-sm"
                                                textSizeRatio={3}
                                            />

                                            <p className="text-sm font-medium text-gray-900">
                                                {department.name}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <p className="text-sm text-gray-600">
                                            {formatDate(department.createdAt)}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingDepartments(department);
                                                    setForm({
                                                        name: department.name,
                                                    });
                                                    setShowForm(true);
                                                }}
                                                title="Edit department"
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
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel>More Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem disabled className="py-2">
                                                            <FiHash className="mr-2" />
                                                            ID: {department.id}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={async () => {
                                                                const confirmed = window.confirm(
                                                                    `Delet "${department.name}"?`
                                                                );

                                                                if (!confirmed) return;

                                                                await departmentService.delete(department.id);

                                                                setDepartments((prev) =>
                                                                    prev.filter((item) => item.id !== department.id)
                                                                );
                                                            }}
                                                            className="py-2 text-red-600 focus:text-red-600">
                                                            <FiTrash2 className="mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
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


                {filteredDepartments.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <FiGrid className="mx-auto mb-3 text-gray-300" size={40} />
                        <p className="text-sm font-medium text-gray-500">
                            No departments found.
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            There are no departments to display.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}