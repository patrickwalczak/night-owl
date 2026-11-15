import { notFound, redirect } from 'next/navigation';

import { getCachedCategoryProductsPageBySlug } from '../../../api/getCategoryProductsPageBySlug';
import { SEARCH_PARAMS_KEYS } from '../../../config/searchParams';
import { parseCategorySearchParams } from '../../../lib/url';
import { ProductsInfinite } from './productsInfinite/ProductsInfinite';

interface CategoryProductsServerType {
    categorySlug: string;
    searchParams: string;
}

export const CategoryProductsServer = async ({ categorySlug, searchParams }: CategoryProductsServerType) => {
    const products = await getCachedCategoryProductsPageBySlug(categorySlug, searchParams);
    if (!products) notFound();

    const search = new URLSearchParams(searchParams);
    if (products.page > products.totalPages) {
        search.delete(SEARCH_PARAMS_KEYS.PAGE);
        const query = search.toString();
        redirect(`/category/${categorySlug}${query ? `?${query}` : ''}`);
    }

    const { filters, sort } = parseCategorySearchParams(search);

    return <ProductsInfinite categorySlug={categorySlug} initialProducts={products} appliedFilters={filters} sort={sort} />;
};
