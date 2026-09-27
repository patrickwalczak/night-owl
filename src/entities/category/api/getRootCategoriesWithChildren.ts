import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';

import { prisma } from '@/shared/lib/db/server';

import { categoryWithChildrenSelect } from '../model/select';
import { type RootCategoriesWithChildren } from '../model/type';

export const getRootCategoriesWithChildren = async (): Promise<RootCategoriesWithChildren> => {
    'use cache';
    cacheLife('hours');
    cacheTag('categories');

    return prisma.category.findMany({
        where: {
            parentId: null,
        },
        select: categoryWithChildrenSelect,
    });
};
