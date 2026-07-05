import { cache } from 'react';
import 'server-only';

import { prisma } from '@/shared/lib/db/server';

import { PAGE_SIZE } from '../config/constants';
import { catalogCategorySelect, catalogParameterSelect, catalogProductSelect } from '../model/catalog.select';
import { type CatalogPageData } from '../model/catalog.types';
import { toOrderBy } from './lib/getOrderBy';
import { type GetCatalogPageDataOptions } from './model/getCatalogPageData/type';

export const getCatalogPageData = cache(
    async (slug: string, opts: GetCatalogPageDataOptions): Promise<CatalogPageData> => {
        const page = Math.max(1, opts.page ?? 1);

        const whereProducts: any = {
            OR: [{
                category: {
                    slug,
                },
            }, {
                category: {
                    parent: {
                        slug,
                    },
                },
            }],
        };

        const [category, items, total, parameters] = await prisma.$transaction(
            [
                prisma.category.findUnique({
                    where: {
                        slug,
                    },
                    select: catalogCategorySelect,
                }),
                prisma.product.findMany({
                    where: whereProducts,
                    orderBy: toOrderBy(opts.sort),
                    skip: (page - 1) * PAGE_SIZE,
                    take: PAGE_SIZE,
                    select: catalogProductSelect,
                }),
                prisma.product.count({
                    where: whereProducts,
                }),
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
                    orderBy: {
                        name: 'asc',
                    },
                    select: catalogParameterSelect,
                }),
            ],
            {
                isolationLevel: 'RepeatableRead',
            },
        );

        return {
            category,
            products: {
                items,
                total,
                pageSize: PAGE_SIZE,
                page,
            },
            parameters,
        };
    },
);
