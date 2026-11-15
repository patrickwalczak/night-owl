import 'server-only';
import { cache } from 'react';

import type { ProductListPage } from '@/entities/product';

import { getCachedCategoryWithChildrenBySlug } from '@/entities/category/server';
import { getCategoryProductsPage } from '@/entities/product/server';

import { PAGE_SIZE } from '../config/constants';
import { toOrderBy } from '../lib/toOrderBy';
import { parseCategorySearchParams } from '../lib/url';

export const getCategoryProductsPageBySlug = async (
    categorySlug: string,
    searchParams: string,
): Promise<ProductListPage | null> => {
    const category = await getCachedCategoryWithChildrenBySlug(categorySlug);
    if (!category) return null;

    const { page, sort, query, filters } = parseCategorySearchParams(new URLSearchParams(searchParams));

    return getCategoryProductsPage({
        categoryIds: [category.id, ...category.children.map(child => child.id)],
        page,
        sort: toOrderBy(sort),
        query,
        pageSize: PAGE_SIZE,
        filters,
    });
};

export const getCachedCategoryProductsPageBySlug = cache(getCategoryProductsPageBySlug);
