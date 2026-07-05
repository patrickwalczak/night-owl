import type { CategorySelect, ParameterSelect } from '@/shared/lib/db';

export const catalogCategorySelect = {
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

export const catalogParameterSelect = {
    id: true,
    name: true,
    values: {
        select: {
            id: true,
            value: true,
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
