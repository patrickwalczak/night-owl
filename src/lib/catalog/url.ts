import { SearchParamsType, SortKey } from './types';

export function parseListingParams(searchParams: URLSearchParams) {
	const page = Math.max(1, Number(searchParams.get('page') ?? 1) || 1);
	const sort = (searchParams.get('sort') as SortKey) ?? 'popularity';
	const query = searchParams.get('q') ?? '';
	const priceMin = searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined;
	const priceMax = searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined;
	const paramsCsv = searchParams.get('params') ?? '';
	const paramValueIds = paramsCsv ? paramsCsv.split(',').filter(Boolean) : [];
	return { page, sort, query, priceMin, priceMax, paramValueIds };
}

export const normalizeSearchParams = (searchParams: SearchParamsType) => {
	return new URLSearchParams(
		Object.entries(searchParams).flatMap(([paramKey, paramValue]) =>
			!paramValue
				? []
				: Array.isArray(paramValue)
				? paramValue.map((nestedParamValue) => [paramKey, nestedParamValue])
				: [[paramKey, paramValue]]
		)
	);
};
