import api from "@/lib/api";
import type { CreateEmployeeInput, PaginationParams, UpdateEmployeeInput } from "@/types/employees.types";

export const employesServices = {
    async create(data: CreateEmployeeInput) {
        const response = await api.post("/employees", data);
        return response.data;
    },

    async getAll() {
        const response = await api.get("/employees");
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    },

    async paginate({
        page = 1,
        limit = 10,
        search
    }: PaginationParams) {
        const response = await api.get("/employees", {
            params: {
                page,
                limit,
                ...(search && { search }),
            },
        });

        return response.data
    },

    async update(id: number, data: UpdateEmployeeInput) {
        const response = await api.patch(`/employees/${id}`, data);
        return response.data;
    },

    
};
