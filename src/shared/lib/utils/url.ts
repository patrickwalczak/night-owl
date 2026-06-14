import { CATALOG_SEARCH_PARAMS_KEYS, CATALOG_SORT_VALUES, DEFAULT_SORT_ORDER } from '@/constants';
import { type CatalogSearchParamsType, type CatalogSortOrderType } from '@/types/catalog.models';

export const isCatalogSortOrder = (value: string | null): value is CatalogSortOrderType => {
    return CATALOG_SORT_VALUES.includes(value as CatalogSortOrderType);
};

export function parseListingParams(searchParams: URLSearchParams) {
    const pageParam = searchParams.get(CATALOG_SEARCH_PARAMS_KEYS.PAGE);
    const sortParam = searchParams.get(CATALOG_SEARCH_PARAMS_KEYS.SORT);
    const queryParam = searchParams.get(CATALOG_SEARCH_PARAMS_KEYS.QUERY);
    const filtersParam = searchParams.get(CATALOG_SEARCH_PARAMS_KEYS.FILTERS);

    const parsedPage = Number(pageParam);
    const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    const sort = isCatalogSortOrder(sortParam) ? sortParam : DEFAULT_SORT_ORDER;

    const query = queryParam ?? '';

    const paramValueIds = filtersParam ? filtersParam.split(',').filter(Boolean) : [];

    return {
        page,
        sort,
        query,
        paramValueIds,
    };
}

export const normalizeSearchParams = (searchParams: CatalogSearchParamsType) => {
    const normalizedSearchParamsEntries = Object.entries(searchParams).flatMap(([paramKey, paramValue]) => {
        if (!paramValue) {
            return [];
        }

        if (Array.isArray(paramValue)) {
            return paramValue.map(nestedParamValue => [paramKey, nestedParamValue]);
        }

        return [[paramKey, paramValue]];
    });

    return new URLSearchParams(normalizedSearchParamsEntries);
};

/**
 * Returns a list of IDs from the comma-separated `filters` query parameter.
 *
 * Empty values are ignored and each ID is trimmed.
 *
 * @param searchParams - URL search parameters.
 * @returns A list of parsed IDs.
 */
export const getIdsFromSearchParams = (searchParams: URLSearchParams): string[] => {
    return (searchParams.get(CATALOG_SEARCH_PARAMS_KEYS.FILTERS) ?? '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
};
