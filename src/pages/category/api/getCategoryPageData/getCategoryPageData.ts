import 'server-only';

import { getCachedCategoryWithChildrenBySlug } from '@/entities/category/server';
import { getCategoryProductsPage } from '@/entities/product/server';

import { PAGE_SIZE } from '../../config/constants';
import { toOrderBy } from '../../lib/toOrderBy';
import { type CategoryPageData } from '../../model/categoryPage.types';
import { getCategoryParameters } from './getCategoryParameters';
import { type GetCategoryPageDataOptions } from './types';

const NOT_FOUND_FALLBACK = {
    category: null,
    products: {
        items: [],
        nextPage: null,
        totalPages: 1,
        total: 0,
        pageSize: PAGE_SIZE,
        page: 1,
    },
    parameters: [],
};

export const getCategoryPageData = async (
    slug: string,
    {
        page,
        sort,
        query,
        filters,
    }: GetCategoryPageDataOptions,
): Promise<CategoryPageData> => {
    const category = await getCachedCategoryWithChildrenBySlug(slug);

    if (!category) return NOT_FOUND_FALLBACK;

    const categoryIds = [
        category.id,
        ...category.children.map(child => child.id),
    ];

    const products = await getCategoryProductsPage({
        categoryIds,
        page,
        sort: toOrderBy(sort),
        query,
        pageSize: PAGE_SIZE,
        filters,
    });

    return {
        category,
        products,
    };
};
