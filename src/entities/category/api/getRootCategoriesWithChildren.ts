import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

import { categoryWithChildrenSelect } from '../model/select';
import { type RootCategoriesWithChildren } from '../model/type';

export const getRootCategoriesWithChildren = cache(
    async function getRootCategoriesWithChildren(): Promise<RootCategoriesWithChildren> {
        return prisma.category.findMany({
            where: {
                parentId: null,
            },
            select: categoryWithChildrenSelect,
        });
    },
);
