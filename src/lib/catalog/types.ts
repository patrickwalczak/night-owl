export type SortKey = 'popularity' | 'price_asc' | 'price_desc' | 'newest';

export type SearchParamsType = {
	query?: string;
	sort?: SortKey;
	page?: string;
	params?: string;
} & Record<string, never>;

export interface UrlParamType {
	category_slug: string;
}
