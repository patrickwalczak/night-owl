import type { CategoryGetPayload } from '@/shared/lib/db';

import { type categoryWithChildrenSelect } from './select';

export type CategoryWithChildren = CategoryGetPayload<{
    select: typeof categoryWithChildrenSelect;
}>;

export type RootCategoriesWithChildren = CategoryWithChildren[];
