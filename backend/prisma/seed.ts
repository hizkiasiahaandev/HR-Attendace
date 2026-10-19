import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const  existingAdmin = await prisma.user.findUnique({
        where: { email: "admin@gmail.com"},
    });

    if (existingAdmin) {
        throw new Error("Admin sudah ada!");
    }

    const admin = await prisma.user.upsert({
        where: {
            email: "admin@gmail.com",
        },
        update: {},
        create: {
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });
    console.log("Admin created", admin.email);
}

main()
    .catch((error) => {
        console.error(error instanceof Error ? error.message : "Gagal membuat admin!");
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });