import { NextResponse } from 'next/server';
import { getCategoryBySlug } from '@/lib/serverActions/category';
import { getParametersForCategory } from '@/lib/serverActions/parameter';

export async function GET(_req: Request, ctx: { params: Promise<{ category_slug: string }> }) {
	const params = await ctx.params;

	const cat = await getCategoryBySlug(params.category_slug);

	if (!cat) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

	const data = await getParametersForCategory(cat.id);
	return NextResponse.json({ parameters: data });
}
