export const SORT_VALUE = {
    POPULARITY: 'popularity',
    NEWEST: 'newest',
} as const;

export const SORT_OPTIONS = [
    {
        value: SORT_VALUE.POPULARITY,
        label: 'Featured',
    },
    {
        value: SORT_VALUE.NEWEST,
        label: 'Newest',
    },
] as const;

export const SORT_VALUES = SORT_OPTIONS.map(({ value }) => value);

export const SEARCH_PARAMS_KEYS = {
    QUERY: 'query',
    SORT: 'sort',
    PAGE: 'page',
} as const;

export const DEFAULT_SORT_ORDER = SORT_VALUE.POPULARITY;

export const DEFAULT_PAGE = '1';
