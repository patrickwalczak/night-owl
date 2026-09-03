import 'server-only';

import { getCategoryProductsPage } from '@/entities/product/server';
import { prisma } from '@/shared/lib/db/server';

import { PAGE_SIZE } from '../config/constants';
import { categoryPageCategorySelect, categoryPageParameterSelect } from '../model/categoryPage.select';
import { type CategoryPageData } from '../model/categoryPage.types';
import { toOrderBy } from './lib/getOrderBy';
import { type GetCategoryPageDataOptions } from './model/getCategoryPageData/type';

export const getCategoryPageData = async (slug: string, opts: GetCategoryPageDataOptions): Promise<CategoryPageData> => {
    const page = Math.max(1, opts.page ?? 1);

    const [category, parameters] = await prisma.$transaction(
        [
            prisma.category.findUnique({
                where: {
                    slug,
                },
                select: categoryPageCategorySelect,
            }),
            // returns parameters that are assigned to at least one category whose slug matches the current slug or whose parent category has that slug
            prisma.parameter.findMany({
                where: {
                    categories: {
                        some: {
                            category: {
                                OR: [{
                                    slug,
                                }, {
                                    parent: {
                                        slug,
                                    },
                                }],
                            },
                        },
                    },
                },
                select: categoryPageParameterSelect,
            }),
        ],
        {
            isolationLevel: 'RepeatableRead',
        },
    );

    if (!category) {
        return {
            category,
            products: {
                items: [],
                nextPage: null,
                totalPages: 1,
                total: 0,
                pageSize: PAGE_SIZE,
                page,
            },
            parameters,
        };
    }

    const products = await getCategoryProductsPage({
        categoryId: category.id,
        page,
        sort: toOrderBy(opts.sort),
        query: opts.query,
        pageSize: PAGE_SIZE,
    });

    return {
        category,
        products,
        parameters,
    };
};
