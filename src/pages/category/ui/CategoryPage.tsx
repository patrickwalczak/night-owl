import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { getCachedCategoryWithChildrenBySlug } from '@/entities/category/server';
import { COOKIES } from '@/shared/config';

import { normalizeSearchParams, parseCategorySearchParams } from '../lib/url';
import { CategoryPageProvider } from '../model/categoryPageContext';
import { type RouteParamsType } from '../model/params/routeParams.types';
import { type RawUrlSearchParams } from '../model/params/searchParams.types';
import { CategoryProductsView } from './components/categoryProducts/CategoryProductsView';

interface CategoryPageType {
    params: Promise<RouteParamsType>;
    searchParams: Promise<RawUrlSearchParams>;
}

export const CategoryPage = async ({ params, searchParams }: CategoryPageType) => {
    const [awaitedParams, awaitedSearchParams] = await Promise.all([params, searchParams]);

    const { category_slug } = awaitedParams;
    const search = normalizeSearchParams(awaitedSearchParams);
    const parsedParams = parseCategorySearchParams(search);

    const category = await getCachedCategoryWithChildrenBySlug(category_slug);

    if (!category) notFound();

    const areFiltersOpen = (await cookies()).get(COOKIES.areFiltersOpen.name)?.value === '1';

    return (
        <CategoryPageProvider
            categoryId={category.id}
            areFiltersOpen={areFiltersOpen}
            appliedFilters={parsedParams.filters}
        >
            <CategoryProductsView
                categorySlug={category.slug}
                searchParams={search.toString()}
            />
        </CategoryPageProvider>
    );
};
