import 'server-only';

import { getCategoryIdsForListing } from '@/entities/category/server';
import { getCategoryProductsPage } from '@/entities/product/server';
import { prisma } from '@/shared/lib/db/server';

import { PAGE_SIZE } from '../config/constants';
import { categoryPageCategorySelect, categoryPageParameterSelect } from '../model/categoryPage.select';
import { type CategoryPageData } from '../model/categoryPage.types';
import { toOrderBy } from './lib/getOrderBy';
import { type GetCategoryPageDataOptions } from './model/getCategoryPageData/type';

export const getCategoryPageData = async (
    slug: string,
    {
        page,
        sort,
        query,
        filters,
    }: GetCategoryPageDataOptions,
): Promise<CategoryPageData> => {
    const categoryData = await prisma.$transaction(
        async (tx) => {
            const category = await tx.category.findUnique({
                where: {
                    slug,
                },
                select: categoryPageCategorySelect,
            });

            if (!category) return null;

            const categoryIds = await getCategoryIdsForListing(category.id, tx);
            const rawParameters = await tx.parameter.findMany({
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

            return { category, categoryIds, rawParameters };
        },
        {
            isolationLevel: 'RepeatableRead',
        },
    );

    if (!categoryData) {
        return {
            category: null,
            products: {
                items: [],
                nextPage: null,
                totalPages: 1,
                total: 0,
                pageSize: PAGE_SIZE,
                page,
            },
            parameters: [],
        };
    }

    const { category, categoryIds, rawParameters } = categoryData;
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
