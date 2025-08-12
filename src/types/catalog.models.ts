import { SORT_ORDER_OPTIONS } from '@/constants';

export type SortOrderKeys = (typeof SORT_ORDER_OPTIONS)[number];

export type SearchParamsType = {
	query?: string;
	sort?: SortOrderKeys;
	page?: string;
	params?: string;
} & Record<string, never>;

export interface UrlParamType {
	category_slug: string;
}
