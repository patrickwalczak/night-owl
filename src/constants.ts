import { SortOrderKeys } from './types/catalog.models';

export const SORT_ORDER_OPTIONS = ['popularity', 'price_asc', 'price_desc', 'newest'] as const;

export const SEARCH_PARAMS_KEYS = ['query', 'sort', 'page', 'params'] as const;

export const DEFAULT_SORT_ORDER: SortOrderKeys = 'popularity';
