'use server';

import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

import { categoryIdSelect } from '../model/select';

export const getCategoryIdBySlug = cache(async (slug: string) => {
    return prisma.category.findUnique({
        where: {
            slug,
        },
        select: categoryIdSelect,
    });
});
