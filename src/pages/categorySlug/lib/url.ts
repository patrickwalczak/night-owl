import { SEARCH_PARAMS_KEYS, SORT_VALUES, DEFAULT_SORT_ORDER } from '../config/searchParams';
import { type SearchParamsType, type SortOrderType } from '../model/searchParams.types';

export const isCatalogSortOrder = (value: string | null): value is SortOrderType => {
    return SORT_VALUES.includes(value as SortOrderType);
};

/**
 * Parses and normalizes listing-related search params from the URL.
 *
 * It converts raw URL values into safe values used by the application:
 * - invalid or missing page values fallback to page 1,
 * - invalid or missing sort values fallback to the default sort order,
 * - missing query values become an empty string,
 * - filter values are split into an array and empty values are removed.
 *
 * This prevents invalid URL params from leaking into the listing logic.
 */
export function parseListingParams(searchParams: URLSearchParams) {
    const pageParam = searchParams.get(SEARCH_PARAMS_KEYS.PAGE);
    const sortParam = searchParams.get(SEARCH_PARAMS_KEYS.SORT);
    const queryParam = searchParams.get(SEARCH_PARAMS_KEYS.QUERY);
    const filtersParam = searchParams.get(SEARCH_PARAMS_KEYS.FILTERS);

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

/**
 * Converts a search params object into a URLSearchParams instance.
 *
 * It removes empty values and expands array values into multiple
 * query entries with the same key.
 *
 * Example:
 * { filters: ['1', '2'], query: '' }
 * becomes:
 * ?filters=1&filters=2
 */
export const normalizeSearchParams = (searchParams: SearchParamsType) => {
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
    return (searchParams.get(SEARCH_PARAMS_KEYS.FILTERS) ?? '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
};
