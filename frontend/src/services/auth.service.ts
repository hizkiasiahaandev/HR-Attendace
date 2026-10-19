import api from "@/lib/api";
import type { ChangePasswordInput, LoginInput, LoginResponse } from "@/types/auth.types";

export const authService = {
    async login(data: LoginInput): Promise<LoginResponse> {
        const response = await api.post("/auth/login", data);
        return response.data.data;
    },

    async getMe() {
        const response = await api.get("/auth/me");
        return response.data;
    },

    async changePassword(data: ChangePasswordInput) {
        const response = await api.patch("/auth/change-password", data);
        return response.data;
    },

    async getMeAdmin() {
        const response = await api.get("/auth/me/admin");
        return response.data;
    },

};