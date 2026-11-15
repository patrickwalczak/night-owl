import { type CategoryParameter, type RawCategoryParameter } from '../model/categoryPage.types';

export const mapCategoryParametersWithProductCounts = (rawParameters: RawCategoryParameter[]): CategoryParameter[] => {
    return rawParameters.map(({ values, ...parameter }) => ({
        ...parameter,
        values: values.map(({ _count, ...value }) => ({
            ...value,
            count: _count.products,
        })),
    }));
};
