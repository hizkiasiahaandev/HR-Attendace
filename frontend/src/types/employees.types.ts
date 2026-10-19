export interface CreateEmployeeInput {
    employeeCode: string;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    position: string;
    joinDate: string;
    departmentId: number;
}

export interface UpdateEmployeeInput {
    employeeCode: string;
    fullName: string;
    email: string;
    password?: string;
    phone?: string;
    position: string;
    joinDate: Date;
    departmentId: number;
}

export interface Employee {
    id: number;
    employeeCode: string;
    fullName: string;
    phone: string | null;
    position: string;
    joinDate: string;
    departmentId: number;
    createdAt: string;
    updatedAt: string;
    user: {
        email: string;
    };
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}