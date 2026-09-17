import 'server-only';

import {
    prisma,
    type ProductOrderByWithRelationInput,
    type ProductWhereInput,
} from '@/shared/lib/db/server';

import { productListItemSelect } from '../model/productListItem.select';
import { type ProductListPage } from '../model/productListItem.type';

interface GetCategoryProductsPageOptions {
    categoryId: string;
    page: number;
    sort: ProductOrderByWithRelationInput;
    query?: string;
    pageSize: number;
    filters: Record<string, string[]>;
}

export async function getCategoryProductsPage({
    page,
    categoryId,
    sort,
    query,
    pageSize,
    filters,
}: GetCategoryProductsPageOptions): Promise<ProductListPage> {
    const children = await prisma.category.findMany({
        where: {
            parentId: categoryId,
        },
        select: {
            id: true,
        },
    });
    const categoryIds = [categoryId, ...children.map(c => c.id)];

    const where: ProductWhereInput = {
        categoryId: {
            in: categoryIds,
        },
    };

    if (query) where.name = {
        contains: query,
        mode: 'insensitive',
    };

    const [items, total] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy: sort,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: productListItemSelect,
        }),
        prisma.product.count({
            where,
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
        items,
        nextPage: page < totalPages ? page + 1 : null,
        totalPages,
        total,
        pageSize,
        page,
    };
}
