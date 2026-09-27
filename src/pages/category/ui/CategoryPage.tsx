import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getCategoryPageData } from '../api/getCategoryPageData';
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

    const areFiltersOpen = (await cookies()).get('areFiltersOpen')?.value === '1';

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
