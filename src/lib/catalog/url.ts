import { SortKey } from './types';

export function parseListingParams(searchParams: URLSearchParams) {
	const page = Math.max(1, Number(searchParams.get('page') ?? 1) || 1);
	const sort = (searchParams.get('sort') as SortKey) ?? 'popularity';
	const q = searchParams.get('q') ?? '';
	const priceMin = searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined;
	const priceMax = searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined;
	const paramsCsv = searchParams.get('params') ?? '';
	const paramValueIds = paramsCsv ? paramsCsv.split(',').filter(Boolean) : [];
	return { page, sort, q, priceMin, priceMax, paramValueIds };
}
