import { SortOrderKeys } from './types/catalog.models';

export const SORT_ORDER_OPTIONS = ['popularity', 'price_asc', 'price_desc', 'newest'] as const;

export const SEARCH_PARAMS_KEYS = ['query', 'sort', 'page', 'params'] as const;

export const DEFAULT_SORT_ORDER: SortOrderKeys = 'popularity';

export const TABLET_BREAKPOINT = 768;

export const DESKTOP_BREAKPOINT = 1024;

export const SORT_OPTIONS: { value: SortOrderKeys; label: string }[] = [
	{ value: 'popularity', label: 'Featured' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'price_desc', label: 'Price: High-Low' },
	{ value: 'price_asc', label: 'Price: Low-High' },
];
