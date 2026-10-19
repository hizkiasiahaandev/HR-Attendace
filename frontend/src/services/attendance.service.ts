import api from "@/lib/api";

export const attendanceService = {
    async checkIn() {
        const response = await api.post("/attendances/check-in");
        return response.data;
    },

    async checkOut() {
        const response = await api.patch("/attendances/check-out");
        return response.data;
    },

    async getMy() {
        const response = await api.get("/attendances/my");
        return response.data;
    },

    async getAll() {
        const response = await api.get("/attendances");
        return response.data;
    },

    async checkAttendance() {
        const response = await api.post("/attendances/check-attendance");
        return response.data;
    },

};