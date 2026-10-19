export interface CreateDepartmentInput {
    name: string;
}

export interface UpdateDepartmentInput {
    name: string;
}

export interface Department {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}