import { NextResponse } from 'next/server';

import { getCategoryBySlug } from '@/entities/category/api/getCategoryBySlug';
import { getProductsForCategory } from '@/entities/product/server';
import { toOrderBy } from '@/pages/categorySlug/api/lib/getOrderBy';
import { PAGE_SIZE } from '@/pages/categorySlug/config/constants';
import { parseCatalogSearchParams } from '@/pages/categorySlug/lib/url';

export async function GET(req: Request, ctx: { params: Promise<{ category_slug: string }> }) {
    const params = await ctx.params;
    const { searchParams } = new URL(req.url);

    const parsed = parseCatalogSearchParams(searchParams);

    const category = await getCategoryBySlug(params.category_slug);

    if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const { items, total, pageSize, page } = await getProductsForCategory({
        categoryId: category.id,
        page: parsed.page,
        sort: toOrderBy(parsed.sort),
        query: parsed.query,
        pageSize: PAGE_SIZE,
    });

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const nextPage = page < totalPages ? page + 1 : null;

    return NextResponse.json({
        items,
        page,
        nextPage,
        total,
        pageSize,
    });
}
