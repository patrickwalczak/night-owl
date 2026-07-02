import { SORT_VALUE } from '../../config/searchParams';
import { type SortOrderType } from '../../model/searchParams.types';

export function toOrderBy(sort: SortOrderType) {
    switch (sort) {
        case SORT_VALUE.PRICE_ASC:
            return { price: 'asc' as const };
        case SORT_VALUE.PRICE_DESC:
            return { price: 'desc' as const };
        case SORT_VALUE.NEWEST:
            return { createdAt: 'desc' as const };
        default:
            return { createdAt: 'desc' as const };
    }
}
