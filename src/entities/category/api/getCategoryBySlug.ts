'use server';

import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

import { categoryWithChildrenSelect } from '../model/select';

export const getCategoryBySlug = cache(async (slug: string) => {
    return prisma.category.findUnique({
        where: {
            slug,
        },
        select: categoryWithChildrenSelect,
    });
});
