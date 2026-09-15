import { type SEARCH_PARAMS_KEYS, type SORT_VALUE } from '../config/searchParams';

export type SortOrderType = (typeof SORT_VALUE)[keyof typeof SORT_VALUE];

export type RawSearchParamValue = string | string[] | undefined | null;

export type RawFilters = Record<string, RawSearchParamValue>;

export type ParsedFilters = Record<string, string[]>;

export interface RawUrlSearchParams extends RawFilters {
    [SEARCH_PARAMS_KEYS.QUERY]?: RawSearchParamValue;
    [SEARCH_PARAMS_KEYS.SORT]?: RawSearchParamValue;
    [SEARCH_PARAMS_KEYS.PAGE]?: RawSearchParamValue;
}

export interface ParsedCategorySearchParams {
    [SEARCH_PARAMS_KEYS.PAGE]: number;
    [SEARCH_PARAMS_KEYS.SORT]: SortOrderType;
    [SEARCH_PARAMS_KEYS.QUERY]: string;
    filters: ParsedFilters;
}
