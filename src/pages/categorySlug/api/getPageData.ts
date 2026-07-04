import { cache } from 'react';
import 'server-only';

import { prisma } from '@/shared/lib/db/server';

import { PAGE_SIZE } from '../config/constants';
import { toOrderBy } from './lib/getOrderBy';
import { type GetPageDataOptions } from './model/types';

export const getPageData = cache(async (slug: string, opts: GetPageDataOptions) => {
    const page = Math.max(1, opts.page ?? 1);

    const whereProducts: any = {
        OR: [{ category: { slug } }, { category: { parent: { slug } } }],
    };

    if (opts.paramValueIds?.length) {
        whereProducts.parameterValues = {
            some: { parameterValueId: { in: opts.paramValueIds } },
        };
    }

    const [category, items, total, parameters] = await prisma.$transaction(
        [
            prisma.category.findUnique({
                where: { slug },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    parentId: true,
                    children: { select: { id: true, name: true, slug: true, _count: { select: { products: true } } } },
                },
            }),
            prisma.product.findMany({
                where: whereProducts,
                orderBy: toOrderBy(opts.sort),
                skip: (page - 1) * PAGE_SIZE,
                take: PAGE_SIZE,
                select: { id: true, name: true, slug: true, price: true, image: true, status: true, currency: true },
            }),
            prisma.product.count({ where: whereProducts }),
            prisma.parameter.findMany({
                where: {
                    categories: {
                        some: {
                            category: {
                                OR: [{ slug }, { parent: { slug } }],
                            },
                        },
                    },
                },
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    name: true,
                    values: {
                        select: { id: true, value: true, _count: { select: { products: true } } },
                        orderBy: { value: 'asc' },
                    },
                },
            }),
        ],
        { isolationLevel: 'RepeatableRead' },
    );

    return {
        category,
        products: { items, total, pageSize: PAGE_SIZE, page },
        parameters,
    };
});
