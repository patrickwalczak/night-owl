import { SORT_VALUE } from '../../config/searchParams';
import { type SortOrderType } from '../../model/searchParams.types';

export function toOrderBy(sort: SortOrderType) {
    switch (sort) {
        case SORT_VALUE.NEWEST:
            return {
                createdAt: 'desc' as const,
            };
        case SORT_VALUE.POPULARITY:
            return {
                createdAt: 'desc' as const,
            };
        default:
            return {
                createdAt: 'desc' as const,
            };
    }
}
