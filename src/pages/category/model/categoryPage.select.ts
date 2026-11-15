import type { ParameterSelect } from '@/shared/lib/db';

export const categoryPageParameterSelect = (categoryIds: string[]) => ({
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
                    products: {
                        where: {
                            product: {
                                categoryId: {
                                    in: categoryIds,
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            value: 'asc',
        },
    },
}) as const satisfies ParameterSelect;
