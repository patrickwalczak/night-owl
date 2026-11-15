export const SORT_VALUE = {
    RECOMMENDED: 'recommended',
    NEWEST: 'newest',
} as const;

export const SORT_OPTIONS = [
    {
        value: SORT_VALUE.RECOMMENDED,
        label: 'Recommended',
    },
    {
        value: SORT_VALUE.NEWEST,
        label: 'Newest',
    },
] as const;

export const SORT_VALUES = SORT_OPTIONS.map(({ value }) => value);

export enum SEARCH_PARAMS_KEYS {
    QUERY = 'query',
    SORT = 'sort',
    PAGE = 'page',
};

export const DEFAULT_SORT_ORDER = SORT_VALUE.RECOMMENDED;

export const DEFAULT_PAGE = '1';
