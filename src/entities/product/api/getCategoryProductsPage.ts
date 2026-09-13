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
}

export async function getCategoryProductsPage(opts: GetCategoryProductsPageOptions): Promise<ProductListPage> {
    const page = Math.max(1, opts.page);

    const children = await prisma.category.findMany({
        where: {
            parentId: opts.categoryId,
        },
        select: {
            id: true,
        },
    });
    const categoryIds = [opts.categoryId, ...children.map(c => c.id)];

    const where: ProductWhereInput = {
        categoryId: {
            in: categoryIds,
        },
    };

    if (opts.query) where.name = {
        contains: opts.query,
        mode: 'insensitive',
    };

    const [items, total] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy: opts.sort,
            skip: (page - 1) * opts.pageSize,
            take: opts.pageSize,
            select: productListItemSelect,
        }),
        prisma.product.count({
            where,
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / opts.pageSize));

    return {
        items,
        nextPage: page < totalPages ? page + 1 : null,
        totalPages,
        total,
        pageSize: opts.pageSize,
        page,
    };
}
