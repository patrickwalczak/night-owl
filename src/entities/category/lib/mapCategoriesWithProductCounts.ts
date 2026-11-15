import type { CategoryWithProductCount, RawCategoryWithProductCount } from '../model/type';

export const mapCategoriesWithProductCounts = (
    rawCategories: RawCategoryWithProductCount[],
): CategoryWithProductCount[] => {
    return rawCategories.map(({ _count, ...category }) => ({
        ...category,
        count: _count.products,
    }));
};
