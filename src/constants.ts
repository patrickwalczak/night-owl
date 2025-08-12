import { SortOrderKeys } from './types/catalog.models';

export const SORT_ORDER_OPTIONS = ['popularity', 'price_asc', 'price_desc', 'newest'] as const;

export const DEFAULT_SORT_ORDER: SortOrderKeys = 'popularity';
