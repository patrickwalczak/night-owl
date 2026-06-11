import { DEFAULT_SORT_ORDER } from '@/constants';
import { type SearchParamsType, type SortOrderKeys } from '@/types/catalog.models';

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

/**
 * Returns a list of IDs from the comma-separated `params` query parameter.
 *
 * Empty values are ignored and each ID is trimmed.
 *
 * @param searchParams - URL search parameters.
 * @returns A list of parsed IDs.
 */
export const getIdsFromSearchParams = (searchParams: URLSearchParams): string[] => {
	return (searchParams.get('params') ?? '')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
};
