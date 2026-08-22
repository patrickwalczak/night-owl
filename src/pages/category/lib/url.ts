import { SEARCH_PARAMS_KEYS, SORT_VALUES, DEFAULT_SORT_ORDER } from '../config/searchParams';
import { type ParsedCategorySearchParams, type RawUrlSearchParams, type SortOrderType } from '../model/searchParams.types';

export const isCategorySortOrder = (value: string | null): value is SortOrderType => {
    return SORT_VALUES.includes(value as SortOrderType);
};

/**
 * Parses and normalizes category-related search params from the URL.
 *
 * It converts raw URL values into safe values used by the application:
 * - invalid or missing page values fallback to page 1,
 * - invalid or missing sort values fallback to the default sort order,
 * - missing query values become an empty string,
 *
 * This prevents invalid URL params from leaking into the category page logic.
 */
export function parseCategorySearchParams(searchParams: URLSearchParams): ParsedCategorySearchParams {
    const pageParam = searchParams.get(SEARCH_PARAMS_KEYS.PAGE);
    const sortParam = searchParams.get(SEARCH_PARAMS_KEYS.SORT);
    const queryParam = searchParams.get(SEARCH_PARAMS_KEYS.QUERY);

    const parsedPage = Number(pageParam);
    const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    const sort = isCategorySortOrder(sortParam) ? sortParam : DEFAULT_SORT_ORDER;

    const query = queryParam ?? '';

    return {
        page,
        sort,
        query,
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
        if (!paramValue) {
            return [];
        }

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
