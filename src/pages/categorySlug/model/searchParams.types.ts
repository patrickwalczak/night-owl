import { type SEARCH_PARAMS_KEYS, type SORT_VALUE } from '../config/searchParams';

export type SortOrderType = (typeof SORT_VALUE)[keyof typeof SORT_VALUE];

export type SearchParamsKeys = (typeof SEARCH_PARAMS_KEYS)[keyof typeof SEARCH_PARAMS_KEYS];

export type SearchParamValue = string | string[] | undefined;

export interface RawUrlSearchParams {
    [SEARCH_PARAMS_KEYS.QUERY]?: SearchParamValue;
    [SEARCH_PARAMS_KEYS.SORT]?: SearchParamValue;
    [SEARCH_PARAMS_KEYS.PAGE]?: SearchParamValue;
}

export interface ParsedCatalogSearchParams {
    [SEARCH_PARAMS_KEYS.PAGE]: number;
    [SEARCH_PARAMS_KEYS.SORT]: SortOrderType;
    [SEARCH_PARAMS_KEYS.QUERY]: string;
}
