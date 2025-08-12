import { NextResponse } from 'next/server';
import { getCategoryBySlug, getProductsForCategory } from '@/lib/catalog/data';
import { parseListingParams } from '@/lib/catalog/url';

export async function GET(req: Request, { params }: { params: { category_slug: string } }) {
	const url = new URL(req.url);
	const parsed = parseListingParams(url.searchParams);

	const category = await getCategoryBySlug(params.category_slug);
	if (!category) {
		return NextResponse.json({ error: 'Category not found' }, { status: 404 });
	}

	const { items, total, pageSize, _debugWhere } = await getProductsForCategory({
		categoryId: category.id,
		page: parsed.page,
		sort: parsed.sort,
		q: parsed.q,
		priceMin: parsed.priceMin,
		priceMax: parsed.priceMax,
		paramValueIds: parsed.paramValueIds,
	});

	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const nextPage = parsed.page < totalPages ? parsed.page + 1 : null;

	if (url.searchParams.get('debug') === '1') {
		return NextResponse.json({
			debug: { category, parsed, where: _debugWhere },
			stats: { countReturned: items.length, total, pageSize, nextPage },
			sample: items.slice(0, 2),
		});
	}

	return NextResponse.json({
		items,
		page: parsed.page,
		nextPage,
		total,
		pageSize,
	});
}
