import { NextResponse } from 'next/server';
import { getCategoryBySlug } from '@/lib/serverActions/category';
import { parseListingParams } from '@/utils/url';
import { getProductsForCategory } from '@/lib/serverActions/product';

export async function GET(req: Request, ctx: { params: Promise<{ category_slug: string }> }) {
	const params = await ctx.params;
	const { searchParams } = new URL(req.url);

	const parsed = parseListingParams(searchParams);

	const category = await getCategoryBySlug(params.category_slug);

	if (!category) {
		return NextResponse.json({ error: 'Category not found' }, { status: 404 });
	}

	const { items, total, pageSize } = await getProductsForCategory({
		categoryId: category.id,
		page: parsed.page,
		sort: parsed.sort,
		query: parsed.query,
		paramValueIds: parsed.paramValueIds,
	});

	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const nextPage = parsed.page < totalPages ? parsed.page + 1 : null;

	return NextResponse.json({
		items,
		page: parsed.page,
		nextPage,
		total,
		pageSize,
	});
}
