'use server';

import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

export const getCategoryBySlug = cache(async (slug: string) => {
    return prisma.category.findUnique({
        where: {
            slug,
        },
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
                    _count: {
                        select: {
                            products: true,
                        },
                    },
                },
            },
        },
    });
});
