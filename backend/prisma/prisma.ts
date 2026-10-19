import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { ENV } from "../src/config/env";

const DATABASE_URL = new URL(ENV.DATABASE_URL);

const adapter = new PrismaMariaDb({ 
    host: DATABASE_URL.hostname,
    port: Number(DATABASE_URL.port),
    user: DATABASE_URL.username,
    password: DATABASE_URL.password,
    database: DATABASE_URL.pathname.slice(1),
    connectionLimit: 5
});

const prisma = new PrismaClient({ adapter });

export { prisma };