import { NextResponse } from 'next/server';

import { getCategoryIdBySlug } from '@/entities/category/server';
import { getCategoryProductsPage } from '@/entities/product/server';
import { toOrderBy, PAGE_SIZE, parseCategorySearchParams } from '@/pages/category/server';

export async function GET(req: Request, ctx: { params: Promise<{ category_slug: string }> }) {
    const params = await ctx.params;
    const { searchParams } = new URL(req.url);

    const { page, sort, query, filters } = parseCategorySearchParams(searchParams);

    const categoryId = await getCategoryIdBySlug(params.category_slug);

    if (!categoryId) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

    const productsPage = await getCategoryProductsPage({
        categoryId,
        page,
        sort: toOrderBy(sort),
        query,
        pageSize: PAGE_SIZE,
        filters,
    });

    return NextResponse.json(productsPage);
}
