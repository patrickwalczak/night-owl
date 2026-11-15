import 'server-only';
import { cache } from 'react';

import { prisma } from '@/shared/lib/db/server';

import type { CategoryWithChildrenAndProductCounts } from '../model/type';

import { mapCategoriesWithProductCounts } from '../lib/mapCategoriesWithProductCounts';
import { categoryWithChildrenSelect } from '../model/select';

export const getCategoryWithChildrenBySlug = async (slug: string): Promise<CategoryWithChildrenAndProductCounts | null> => {
    const category = await prisma.category.findUnique({
        where: {
            slug,
        },
        select: categoryWithChildrenSelect,
    });

    if (!category) return null;

    return {
        ...category,
        children: mapCategoriesWithProductCounts(category.children),
    };
};

export const getCachedCategoryWithChildrenBySlug = cache(getCategoryWithChildrenBySlug);
