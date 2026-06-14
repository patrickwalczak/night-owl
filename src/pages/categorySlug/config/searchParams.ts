import { type SortOrderType } from '../model/searchParams.types';

export const SORT_OPTIONS = [
    { value: 'popularity', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_desc', label: 'Price: High-Low' },
    { value: 'price_asc', label: 'Price: Low-High' },
] as const;

export const SORT_VALUES = SORT_OPTIONS.map(({ value }) => value);

export const SEARCH_PARAMS_KEYS = {
    QUERY: 'query',
    SORT: 'sort',
    PAGE: 'page',
    FILTERS: 'filters',
} as const;

export const DEFAULT_SORT_ORDER: SortOrderType = 'popularity';

export const DEFAULT_PAGE = '1';
