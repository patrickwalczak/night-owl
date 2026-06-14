import { type CatalogSortOrderType } from './types/catalog.models';

export const CATALOG_SORT_OPTIONS = [
    { value: 'popularity', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_desc', label: 'Price: High-Low' },
    { value: 'price_asc', label: 'Price: Low-High' },
] as const;

export const CATALOG_SORT_VALUES = CATALOG_SORT_OPTIONS.map(({ value }) => value);

export const SEARCH_PARAMS_KEYS = ['query', 'sort', 'page', 'filters'] as const;

export const CATALOG_SEARCH_PARAMS_KEYS = {
    QUERY: 'query',
    SORT: 'sort',
    PAGE: 'page',
    FILTERS: 'filters',
} as const;

export const DEFAULT_SORT_ORDER: CatalogSortOrderType = 'popularity';

export const TABLET_BREAKPOINT = 768;

export const DESKTOP_BREAKPOINT = 1024;

// export const DEFAULT_CATALOG_SORT_ORDER = 'popularity';
// export const DEFAULT_CATALOG_PAGE = '1';
