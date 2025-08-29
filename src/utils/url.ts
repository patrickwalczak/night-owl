import { DEFAULT_SORT_ORDER } from '@/constants';
import { SearchParamsType, SortOrderKeys } from '@/types/catalog.models';

export function parseListingParams(searchParams: URLSearchParams) {
	const page = Math.max(1, Number(searchParams.get('page') ?? 1) || 1);
	const sort = (searchParams.get('sort') as SortOrderKeys) ?? DEFAULT_SORT_ORDER;
	const query = searchParams.get('query') ?? '';
	const paramsCsv = searchParams.get('params') ?? '';
	const paramValueIds = paramsCsv ? paramsCsv.split(',').filter(Boolean) : [];
	return { page, sort, query, paramValueIds };
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
