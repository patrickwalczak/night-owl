import 'server-only';

import {
    prisma,
    type ProductOrderByWithRelationInput,
    type ProductWhereInput,
} from '@/shared/lib/db/server';

import { productListItemSelect } from '../model/productListItem.select';
import { type ProductListPage } from '../model/productListItem.type';

interface GetCategoryProductsPageOptions {
    categoryIds: string[];
    page: number;
    sort: ProductOrderByWithRelationInput;
    query?: string;
    pageSize: number;
    filters: Record<string, string[]>;
}

export async function getCategoryProductsPage({
    page,
    categoryIds,
    sort,
    query,
    pageSize,
    filters,
}: GetCategoryProductsPageOptions): Promise<ProductListPage> {
    const where: ProductWhereInput = {
        categoryId: {
            in: categoryIds,
        },
    };

    if (query) where.name = {
        contains: query,
        mode: 'insensitive',
    };

    if (Object.keys(filters).length) {
        where.AND = Object.entries(filters).map(([parameterSlug, valueSlugs]) => ({
            parameterValues: {
                some: {
                    parameterValue: {
                        parameter: {
                            slug: parameterSlug,
                        },
                        slug: {
                            in: valueSlugs,
                        },
                    },
                },
            },
        }));
    }

    const total = await prisma.product.count({ where });
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const items = page <= totalPages && total > 0
        ? await prisma.product.findMany({
            where,
            orderBy: sort,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: productListItemSelect,
        })
        : [];

    return {
        items,
        nextPage: page < totalPages ? page + 1 : null,
        totalPages,
        total,
        pageSize,
        page,
    };
}
