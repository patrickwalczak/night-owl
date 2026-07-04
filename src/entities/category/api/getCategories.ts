import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

import { categoryTreeSelect, type CategoryTree } from '../model/categoryTree';

export const getCategories = cache(async function getCategories(): Promise<CategoryTree> {
    try {
        return prisma.category.findMany({
            where: { parentId: null },
            select: categoryTreeSelect,
        });
    }
    catch (error) {
        console.log(error);
        return [];
    }
});
