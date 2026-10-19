import api from "@/lib/api";
import type { CreateLeaveRequestInput } from "@/types/leave-request.types";

export const leaveRequestService = {
    async create(data: CreateLeaveRequestInput) {
        const response = await api.post("/leave-requests", data);
        return response.data;
    },

    async getMy() {
        const response = await api.get("/leave-requests/my");
        return response.data;
    },

    async getAll() {
        const response = await api.get("/leave-requests");
        return response.data;
    },

    async approve(id: number) {
        const response = await api.patch(`/leave-requests/${id}/approve`);
        return response.data;
    },

    async reject(id: number) {
        const response = await api.patch(`/leave-requests/${id}/reject`);
        return response.data
    },
};