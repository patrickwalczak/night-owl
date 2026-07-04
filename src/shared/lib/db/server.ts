import 'server-only';

// Server DB API: runtime Prisma client plus server-side query/input types.
export { prisma } from './prisma';
export { Prisma } from './generated/client';

export type { PrismaClient } from './generated/client';
export type * from './generated/models';
