import { SEARCH_PARAMS_KEYS, SORT_ORDER_OPTIONS } from '@/constants';

export type SortOrderKeys = (typeof SORT_ORDER_OPTIONS)[number];

export type SearchParamsTypeKeys = (typeof SEARCH_PARAMS_KEYS)[number];

export type SearchParamsType = {
	query?: string;
	sort?: SortOrderKeys;
	page?: string;
	params?: string;
} & Record<string, never>;

export interface UrlParamType {
	category_slug: string;
}
