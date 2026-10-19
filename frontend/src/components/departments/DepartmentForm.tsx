import { FiPlus, FiSave } from "react-icons/fi";
import type { Department, CreateDepartmentInput } from "@/types/department.types";

interface DepartmentFormProps {
    form: CreateDepartmentInput;
    setForm: React.Dispatch<React.SetStateAction<CreateDepartmentInput>>;
    editingDepartment: Department | null;
    handleSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export default function DepartmentForm({
    form,
    setForm,
    editingDepartment,
    handleSubmit,
    onCancel,
}: DepartmentFormProps) {
    return (
        <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    {editingDepartment
                        ? "Edit Department"
                        : "Add Department"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {editingDepartment
                        ? "Update department information."
                        : "Fill in the details below to create a new department."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                        Department Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                        placeholder="e.g. Information Technology"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                        required
                    />
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
                        {editingDepartment ? (
                            <>
                                <FiSave size={16} />
                                Update Department
                            </>
                        ) : (
                            <>
                                <FiPlus size={16} />
                                Create Department
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
