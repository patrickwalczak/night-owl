import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { getCatalogPageData } from '../api/getCatalogPageData';
import { normalizeSearchParams, parseCatalogSearchParams } from '../lib/url';
import CatalogProvider from '../model/providers/CatalogProvider';
import { type RouteParamsType } from '../model/routeParams.types';
import { type RawUrlSearchParams } from '../model/searchParams.types';
import CatalogContainer from '../ui/components/pageView/CatalogContainer';

export default async function CategorySlugPage({
    params,
    searchParams,
}: {
    params: Promise<RouteParamsType>;
    searchParams: Promise<RawUrlSearchParams>;
}) {
    const [awaitedParams, awaitedSearchParams] = await Promise.all([params, searchParams]);

    const { category_slug } = awaitedParams;
    const search = normalizeSearchParams(awaitedSearchParams);
    const parsedParams = parseCatalogSearchParams(search);

    const { category, parameters, products } = await getCatalogPageData(category_slug, parsedParams);

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
