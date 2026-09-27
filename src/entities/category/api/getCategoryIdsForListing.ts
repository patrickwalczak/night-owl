import 'server-only';

import { prisma } from '@/shared/lib/db/server';

export const getCategoryIdsForListing = async (
    categoryId: string,
    db: Pick<typeof prisma, 'category'> = prisma,
): Promise<string[]> => {
    const children = await db.category.findMany({
        where: {
            parentId: categoryId,
        },
        select: {
            id: true,
        },
    });

    return [categoryId, ...children.map(category => category.id)];
};
