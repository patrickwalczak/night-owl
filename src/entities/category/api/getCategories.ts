import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

import { categoryTreeSelect } from '../model/categoryTree.select';
import { type CategoryTree } from '../model/categoryTree.type';

export const getCategories = cache(async function getCategories(): Promise<CategoryTree> {
    try {
        return prisma.category.findMany({
            where: {
                parentId: null,
            },
            select: categoryTreeSelect,
        });
    }
    catch (error) {
        console.log(error);
        return [];
    }
});
