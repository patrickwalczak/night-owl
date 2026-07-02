import { type SortOrderType } from '../../model/searchParams.types';

export interface GetPageDataOptions {
    page?: number;
    sort: SortOrderType;
    paramValueIds?: string[];
    query?: string;
}
