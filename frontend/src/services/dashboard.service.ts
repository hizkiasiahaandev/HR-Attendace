import api from "@/lib/api";

export const dashboardService = {
    async getSummary() {
        const response = await api.get("/dashboard");
        return response.data;
    },
};