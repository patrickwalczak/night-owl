import { SEARCH_PARAMS_KEYS, SORT_VALUES, DEFAULT_SORT_ORDER } from '../config/searchParams';
import {
    type ParsedCategorySearchParams,
    type ParsedFilters,
    type RawSearchParamValue,
    type RawUrlSearchParams,
    type SortOrderType,
} from '../model/searchParams.types';

export const isCategorySortOrder = (value: string | null): value is SortOrderType => {
    return SORT_VALUES.includes(value as SortOrderType);
};

export const isSearchParamsKey = (value: string): value is SEARCH_PARAMS_KEYS => {
    return Object.values(SEARCH_PARAMS_KEYS).includes(
        value as SEARCH_PARAMS_KEYS,
    );
};

/**
 * Parses system params and groups nonempty, unique filter values.
 * Filter names and value slugs still need validation against the category data.
 */
export function parseCategorySearchParams(searchParams: URLSearchParams): ParsedCategorySearchParams {
    const pageParam = searchParams.get(SEARCH_PARAMS_KEYS.PAGE);
    const sortParam = searchParams.get(SEARCH_PARAMS_KEYS.SORT);
    const queryParam = searchParams.get(SEARCH_PARAMS_KEYS.QUERY);

    const filterValues = new Map<string, Set<string>>();

    for (const [key, value] of searchParams) {
        if (!key || !value || isSearchParamsKey(key)) continue;

        const values = filterValues.get(key) ?? new Set<string>();
        values.add(value);
        filterValues.set(key, values);
    }

    const filters: ParsedFilters = Object.fromEntries(
        Array.from(filterValues, ([key, values]) => [key, Array.from(values)]),
    );

    return {
        page: parsePageParam(pageParam),
        sort: isCategorySortOrder(sortParam) ? sortParam : DEFAULT_SORT_ORDER,
        query: queryParam ?? '',
        filters,
    };
}

/**
 * Converts a search params object into a URLSearchParams instance.
 *
 * It removes empty values and expands array values into multiple
 * query entries with the same key.
 *
 * Example:
 * { sort: 'newest', query: '' }
 * becomes:
 * ?sort=newest
 */
export const normalizeSearchParams = (searchParams: RawUrlSearchParams): URLSearchParams => {
    const normalizedSearchParamsEntries = Object.entries(searchParams).flatMap(([paramKey, paramValue]) => {
        if (!paramValue) return [];

        if (Array.isArray(paramValue)) {
            return paramValue.flatMap((nestedParamValue) => {
                if (!nestedParamValue) {
                    return [];
                }

                return [[paramKey, nestedParamValue]];
            });
        }

        return [[paramKey, paramValue]];
    });

    return new URLSearchParams(normalizedSearchParamsEntries);
};

export const parsePageParam = (pageParam: RawSearchParamValue): number => {
    const parsedPage = Number(pageParam);
    const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    return page;
};

export const setPageParamInUrl = (page: number) => {
    const params = new URLSearchParams(window.location.search);

    if (page <= 1) params.delete(SEARCH_PARAMS_KEYS.PAGE);
    else params.set(SEARCH_PARAMS_KEYS.PAGE, String(page));

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;

    window.history.replaceState(null, '', nextUrl);
};
