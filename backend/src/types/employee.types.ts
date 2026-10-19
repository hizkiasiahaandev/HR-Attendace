export interface CreateEmployeeInput {
    employeeCode: string;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    position: string;
    joinDate: Date;
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