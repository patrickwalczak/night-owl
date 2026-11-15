import 'server-only';

import { prisma } from '@/shared/lib/db/server';

import { mapCategoryParametersWithProductCounts } from '../../lib/mapCategoryParametersWithProductCounts';
import { categoryPageParameterSelect } from '../../model/categoryPage.select';
import { type CategoryParameter } from '../../model/categoryPage.types';

export const getCategoryParameters = async (
    categoryIds: string[],
): Promise<CategoryParameter[]> => {
    const rawParameters = await prisma.parameter.findMany({
        where: {
            categories: {
                some: {
                    categoryId: {
                        in: categoryIds,
                    },
                },
            },
        },
        select: categoryPageParameterSelect(categoryIds),
    });

    const parameters = mapCategoryParametersWithProductCounts(rawParameters);

    return parameters;
};
