import "dotenv/config.js";

export const ENV = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
};