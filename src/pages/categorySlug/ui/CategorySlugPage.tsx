import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { getCategoryPageData } from '@/entities/category/api/getCategoryPageData';
import CatalogContainer from '@/pages/categorySlug/ui/components/pageView/CatalogContainer';
import { type UrlParamType, type SearchParamsType } from '@/types/catalog.models';
import { normalizeSearchParams, parseListingParams } from '@/utils/url';

import CatalogProvider from '../model/providers/CatalogProvider';
import { CatalogUrlActionsProvider } from '../model/providers/CatalogUrlActionsProvider';

export default async function CategorySlugPage({
    params,
    searchParams,
}: {
    params: Promise<UrlParamType>;
    searchParams: Promise<SearchParamsType>;
}) {
    const [awaitedParams, awaitedSearchParams] = await Promise.all([params, searchParams]);

    const { category_slug } = awaitedParams;
    const search = normalizeSearchParams(awaitedSearchParams);
    const parsed = parseListingParams(search);

    try {
        const { category, parameters, products } = await getCategoryPageData(category_slug, parsed);

        if (!category) notFound();

        const areFiltersOpen = (await cookies()).get('areFiltersOpen')?.value === '1';

        return (
            <CatalogProvider
                initialProductsProp={products}
                category={category}
                areFiltersOpen={areFiltersOpen}
                parameters={parameters}
            >
                <CatalogUrlActionsProvider>
                    <CatalogContainer />
                </CatalogUrlActionsProvider>
            </CatalogProvider>
        );
    }
    catch (error) {
        console.log(error);
        notFound();
    }
}
