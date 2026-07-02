import { type SEARCH_PARAMS_KEYS, type SORT_VALUE } from '@/pages/categorySlug/config/searchParams';

export type SortOrderType = (typeof SORT_VALUE)[keyof typeof SORT_VALUE];

export type SearchParamsKeys = (typeof SEARCH_PARAMS_KEYS)[keyof typeof SEARCH_PARAMS_KEYS];

export interface SearchParamsType {
    query?: string;
    sort?: SortOrderType;
    page?: string;
    filters?: string;
}

export interface SearchParamsType {
    [SEARCH_PARAMS_KEYS.QUERY]?: string;
    [SEARCH_PARAMS_KEYS.SORT]?: SortOrderType;
    [SEARCH_PARAMS_KEYS.PAGE]?: string;
    [SEARCH_PARAMS_KEYS.FILTERS]?: string;
}
