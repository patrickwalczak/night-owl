import type { CategorySelect } from '@/shared/lib/db';

export const categoryTreeSelect = {
    id: true,
    name: true,
    slug: true,
    parentId: true,
    children: {
        select: {
            id: true,
            name: true,
            slug: true,
            _count: {
                select: {
                    products: true,
                },
            },
        },
    },
} as const satisfies CategorySelect;
