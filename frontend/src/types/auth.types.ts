export type Role = "ADMIN" | "EMPLOYEE"

export interface LoginInput {
    email: string;
    password: string;
}
export interface ChangePasswordInput {
    currentPassword: string;
    newPassword: string;
}

export interface AuthUser {
    id: number;
    email: string;
    role: Role;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}
