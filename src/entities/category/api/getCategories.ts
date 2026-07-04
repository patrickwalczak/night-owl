import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

// TODO
export const getCategories = cache(async function getCategories(): Promise<any[]> {
    try {
        return prisma.category.findMany({
            where: { parentId: null },
            select: {
                id: true,
                name: true,
                slug: true,
                parentId: true,
                children: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        _count: { select: { products: true } },
                    },
                },
            },
        });
    }
    catch (error) {
        console.log(error);
        return [];
    }
});
