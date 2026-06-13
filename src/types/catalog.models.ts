import { CATALOG_SORT_OPTIONS, CATALOG_SEARCH_PARAMS_KEYS } from '@/constants';

export type CatalogSortOrderType = (typeof CATALOG_SORT_OPTIONS)[number]['value'];

export type CatalogSearchParamKeyType = (typeof CATALOG_SEARCH_PARAMS_KEYS)[keyof typeof CATALOG_SEARCH_PARAMS_KEYS];

export type SearchParamsType = {
	query?: string;
	sort?: CatalogSortOrderType;
	page?: string;
	filters?: string;
};

export type CatalogSearchParamsType = {
	[CATALOG_SEARCH_PARAMS_KEYS.QUERY]?: string;
	[CATALOG_SEARCH_PARAMS_KEYS.SORT]?: CatalogSortOrderType;
	[CATALOG_SEARCH_PARAMS_KEYS.PAGE]?: string;
	[CATALOG_SEARCH_PARAMS_KEYS.FILTERS]?: string;
};

export type CatalogRouteParamsType = {
	category_slug: string;
};
