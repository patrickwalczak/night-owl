'use server';
import 'server-only';

import { prisma, type ProductOrderByWithRelationInput } from '@/shared/lib/db/server';

export async function getProductsForCategory(opts: {
    categoryId: string;
    page: number;
    sort: ProductOrderByWithRelationInput;
    paramValueIds?: string[];
    query?: string;
    pageSize: number;
}) {
    const children = await prisma.category.findMany({
        where: { parentId: opts.categoryId },
        select: { id: true },
    });
    const categoryIds = [opts.categoryId, ...children.map(c => c.id)];

    const where: any = { categoryId: { in: categoryIds }, inStock: true };

    if (opts.query) where.name = { contains: opts.query, mode: 'insensitive' };

    if (opts.paramValueIds?.length) {
        where.parameterValues = {
            some: { parameterValueId: { in: opts.paramValueIds } },
        };
    }

    const [items, total] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy: opts.sort,
            skip: (opts.page - 1) * opts.pageSize,
            take: opts.pageSize,
            select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                image: true,
                status: true,
            },
        }),
        prisma.product.count({ where }),
    ]);

    return { items, total, pageSize: opts.pageSize };
}
