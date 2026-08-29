'use server';

import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

import { categoryIdSelect } from '../model/select';

export const getCategoryIdBySlug = cache(async (slug: string): Promise<string | null> => {
    const category = await prisma.category.findUnique({
        where: {
            slug,
        },
        select: categoryIdSelect,
    });

    return category?.id ?? null;
});
