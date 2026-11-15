import { notFound } from 'next/navigation';

import { getCachedCategoryProductsPageBySlug } from '../../../../api/getCategoryProductsPageBySlug';

export const CategoryProductCountServer = async ({ categorySlug, searchParams }: { categorySlug: string; searchParams: string }) => {
    const products = await getCachedCategoryProductsPageBySlug(categorySlug, searchParams);
    if (!products) notFound();

    return ` (${products.total})`;
};
