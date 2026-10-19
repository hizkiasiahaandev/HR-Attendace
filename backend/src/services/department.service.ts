import { prisma } from "../../prisma/prisma";
import type { CreateDepartmentInput, UpdateDepartmentInput } from "../types/department.types";

export const departmentService = {
    async create(data: CreateDepartmentInput) {
        const existingDepartment = await prisma.department.findUnique({
            where: { name: data.name },
        });

        if (existingDepartment) {
            throw new Error("Department already exists");
        }

        return prisma.department.create({
            data: {
                name: data.name,
            },
        });
    },

    async getAll() {
        return prisma.department.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    async getById(id: number) {
        const department = await prisma.department.findUnique({
            where: { id },
        });


        if (!department) {
            throw new Error("Department not found");
        }

        return department;
    },

    async update(id: number, data: UpdateDepartmentInput) {
        return prisma.department.update({
            where: {
                id,
            },
            data: {
                name: data.name,
            },
        });
    },

    async delete(id: number) {
        return prisma.department.deleteMany({
            where: { id},
        });
    },
    
}