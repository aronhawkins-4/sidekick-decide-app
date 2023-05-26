import { PrismaClient } from '@prisma/client';

declare global {
	var pClient: PrismaClient | undefined;
}

const prisma = globalThis.pClient || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.pClient = prisma;

export default prisma;
