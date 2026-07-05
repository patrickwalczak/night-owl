import type { CategoryGetPayload } from '@/shared/lib/db';

import { type categoryTreeSelect } from './categoryTree.select';

export type CategoryTreeItem = CategoryGetPayload<{
    select: typeof categoryTreeSelect;
}>;

export type CategoryTree = CategoryTreeItem[];
