import { PrismaClient } from "@prisma/client/extension";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({datasourceUrl: {
    db: {
        url: process.env.DATABASE_URL
    }
}});

if (process.env.NODE_ENV !== "production") { globalForPrisma.prisma = prisma; }