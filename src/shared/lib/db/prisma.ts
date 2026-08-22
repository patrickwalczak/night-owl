import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { serverEnv } from '../../config/env';
import { PrismaClient } from './generated/client';

const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient;
};

const adapter = new PrismaPg({ connectionString: serverEnv.databaseUrl });

export const prisma
    = globalForPrisma.prisma
        ?? new PrismaClient({
            adapter,
        });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
