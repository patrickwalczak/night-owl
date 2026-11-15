import 'server-only';

import { prisma } from '@/shared/lib/db/server';

export const getCategoryIdsForListing = async (
    categoryId: string,
): Promise<string[]> => {
    const children = await prisma.category.findMany({
        where: {
            parentId: categoryId,
        },
        select: {
            id: true,
        },
    });

    return [categoryId, ...children.map(category => category.id)];
};
