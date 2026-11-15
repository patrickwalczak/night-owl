import 'server-only';

import { categoryWithChildrenSelect } from '@/entities/category/index';
import { getCategoryProductsPage } from '@/entities/product/server';
import { prisma } from '@/shared/lib/db/server';

import { PAGE_SIZE } from '../../config/constants';
import { toOrderBy } from '../../lib/toOrderBy';
import { categoryPageParameterSelect } from '../../model/categoryPage.select';
import { type CategoryPageData } from '../../model/categoryPage.types';
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
    const category = await prisma.category.findUnique({
        where: {
            slug,
        },
        select: categoryWithChildrenSelect,
    });

    if (!category) return NOT_FOUND_FALLBACK;

    const categoryIds = [
        category.id,
        ...category.children.map(child => child.id),
    ];

    const rawParameters = await prisma.parameter.findMany({
        where: {
            categories: {
                some: {
                    categoryId: {
                        in: categoryIds,
                    },
                },
            },
        },
        select: categoryPageParameterSelect(categoryIds),
    });

    const parameters = rawParameters.map(({ values, ...parameter }) => ({
        ...parameter,
        values: values.map(({ _count, ...value }) => ({
            ...value,
            count: _count.products,
        })),
    }));

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
        parameters,
    };
};
