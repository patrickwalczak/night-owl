import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { normalizeSearchParams, parseListingParams } from '@/pages/categorySlug/lib/url';

import { getPageData } from '../api/getPageData';
import CatalogProvider from '../model/providers/CatalogProvider';
import { type RouteParamsType } from '../model/routeParams.types';
import { type SearchParamsType } from '../model/searchParams.types';
import CatalogContainer from '../ui/components/pageView/CatalogContainer';

export default async function CategorySlugPage({
    params,
    searchParams,
}: {
    params: Promise<RouteParamsType>;
    searchParams: Promise<SearchParamsType>;
}) {
    const [awaitedParams, awaitedSearchParams] = await Promise.all([params, searchParams]);

    const { category_slug } = awaitedParams;
    const search = normalizeSearchParams(awaitedSearchParams);
    const parsedParams = parseListingParams(search);

    try {
        const { category, parameters, products } = await getPageData(category_slug, parsedParams);

        if (!category) notFound();

        const areFiltersOpen = (await cookies()).get('areFiltersOpen')?.value === '1';

        return (
            <CatalogProvider
                initialProductsProp={products}
                category={category}
                areFiltersOpen={areFiltersOpen}
                parameters={parameters}
            >
                <CatalogContainer />
            </CatalogProvider>
        );
    }
    catch (error) {
        console.log(error);
        notFound();
    }
}
