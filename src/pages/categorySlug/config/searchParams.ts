import { type SortOrderType } from '../model/searchParams.types';

export const SORT_VALUE = {
    POPULARITY: 'popularity',
    NEWEST: 'newest',
    PRICE_DESC: 'price_desc',
    PRICE_ASC: 'price_asc',
} as const;

export const SORT_OPTIONS = [
    { value: SORT_VALUE.POPULARITY, label: 'Featured' },
    { value: SORT_VALUE.NEWEST, label: 'Newest' },
    { value: SORT_VALUE.PRICE_DESC, label: 'Price: High-Low' },
    { value: SORT_VALUE.PRICE_ASC, label: 'Price: Low-High' },
] as const;

export const SORT_VALUES = SORT_OPTIONS.map(({ value }) => value);

export const SEARCH_PARAMS_KEYS = {
    QUERY: 'query',
    SORT: 'sort',
    PAGE: 'page',
    FILTERS: 'filters',
} as const;

export const DEFAULT_SORT_ORDER: SortOrderType = SORT_VALUE.POPULARITY;

export const DEFAULT_PAGE = '1';
