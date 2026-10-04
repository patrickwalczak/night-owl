import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import { COOKIES } from '@/shared/config';

import { getCategoryPageData } from '../api/getCategoryPageData';
import { SEARCH_PARAMS_KEYS } from '../config/searchParams';
import { normalizeSearchParams, parseCategorySearchParams } from '../lib/url';
import { type RouteParamsType } from '../model/params/routeParams.types';
import { type RawUrlSearchParams } from '../model/params/searchParams.types';
import CategoryPageStoreProvider from '../model/store/CategoryPageStoreProvider';
import CategoryPageSkeleton from '../ui/components/categoryPageSkeleton/CategoryPageSkeleton';
import CategoryProductsView from '../ui/components/categoryProducts/CategoryProductsView';

interface CategoryPageType {
    params: Promise<RouteParamsType>;
    searchParams: Promise<RawUrlSearchParams>;
}

export default function CategoryPage(props: CategoryPageType) {
    return (
        <Suspense fallback={<CategoryPageSkeleton />}>
            <CategoryPageContent {...props} />
        </Suspense>
    );
}

async function CategoryPageContent({ params, searchParams }: CategoryPageType) {
    const [awaitedParams, awaitedSearchParams] = await Promise.all([params, searchParams]);

    const { category_slug } = awaitedParams;
    const search = normalizeSearchParams(awaitedSearchParams);
    const parsedParams = parseCategorySearchParams(search);

    const { category, parameters, products } = await getCategoryPageData(category_slug, parsedParams);

    if (!category) notFound();

    if (parsedParams.page > products.totalPages) {
        search.delete(SEARCH_PARAMS_KEYS.PAGE);
        const query = search.toString();

        redirect(`/category/${category.slug}${query ? `?${query}` : ''}`);
    }

    const areFiltersOpen = (await cookies()).get(COOKIES.areFiltersOpen.name)?.value === '1';

    return (
        <CategoryPageStoreProvider
            initialProducts={products}
            category={category}
            areFiltersOpen={areFiltersOpen}
            parameters={parameters}
            selectedFilters={parsedParams.filters}
        >
            <CategoryProductsView initialProducts={products} appliedFilters={parsedParams.filters} />
        </CategoryPageStoreProvider>
    );
}
