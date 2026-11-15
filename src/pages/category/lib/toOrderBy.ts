import type { ProductOrderByWithRelationInput } from '@/shared/lib/db';

import { SORT_VALUE } from '../config/searchParams';
import { type SortOrderType } from '../model/params/searchParams.types';

export const toOrderBy = (sort: SortOrderType): ProductOrderByWithRelationInput[] => {
    switch (sort) {
        case SORT_VALUE.NEWEST:
            return [{ createdAt: 'desc' }, { id: 'asc' }];
        default:
            return [{ sortOrder: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }];
    }
};
