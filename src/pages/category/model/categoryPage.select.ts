import type { CategorySelect, ParameterSelect } from '@/shared/lib/db';

export const categoryPageCategorySelect = {
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

export const categoryPageParameterSelect = {
    id: true,
    name: true,
    slug: true,
    values: {
        select: {
            id: true,
            value: true,
            slug: true,
            _count: {
                select: {
                    products: true,
                },
            },
        },
        orderBy: {
            value: 'asc',
        },
    },
} as const satisfies ParameterSelect;
