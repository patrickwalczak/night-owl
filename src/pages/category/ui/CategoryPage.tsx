import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { getCategoryPageData } from '../api/getCategoryPageData';
import { normalizeSearchParams, parseCategorySearchParams } from '../lib/url';
import CategoryPageStoreProvider from '../model/CategoryPageStoreProvider';
import { type RouteParamsType } from '../model/routeParams.types';
import { type RawUrlSearchParams } from '../model/searchParams.types';
import CategoryProductsView from '../ui/components/categoryProducts/CategoryProductsView';

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<RouteParamsType>;
    searchParams: Promise<RawUrlSearchParams>;
}) {
    const [awaitedParams, awaitedSearchParams] = await Promise.all([params, searchParams]);

    const { category_slug } = awaitedParams;
    const search = normalizeSearchParams(awaitedSearchParams);
    const parsedParams = parseCategorySearchParams(search);

    const { category, parameters, products } = await getCategoryPageData(category_slug, parsedParams);

    console.log(products);

    if (!category) notFound();

    const areFiltersOpen = (await cookies()).get('areFiltersOpen')?.value === '1';

    return (
        <CategoryPageStoreProvider
            initialProducts={products}
            category={category}
            areFiltersOpen={areFiltersOpen}
            parameters={parameters}
        >
            <CategoryProductsView />
        </CategoryPageStoreProvider>
    );
}
