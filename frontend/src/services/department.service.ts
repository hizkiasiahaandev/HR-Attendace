import api from "@/lib/api";
import type { CreateDepartmentInput,  UpdateDepartmentInput } from "@/types/department.types";

export const departmentService = {
    async create(data: CreateDepartmentInput) {
        const response = await api.post("/departments", data);
        return response.data;
    },

    async getAll() {
        const response = await api.get("/departments");
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/departments/${id}`);
        return response.data;
    },
    
    async update(id: number, data: UpdateDepartmentInput) {
        const response = await api.patch(`/departments/${id}`, data);
        return response.data;
    },
    
    async delete(id: number) {
        const response = await api.delete(`/departments/${id}`);
        return response.data;
    }
    
};

