import { SORT_VALUE } from '../../config/searchParams';
import { type SortOrderType } from '../../model/params/searchParams.types';

export function toOrderBy(sort: SortOrderType) {
    switch (sort) {
        case SORT_VALUE.NEWEST:
            return {
                createdAt: 'desc' as const,
            };
        default:
            return {
                createdAt: 'desc' as const,
            };
    }
}
