import 'server-only';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getCachedCategoryWithChildrenBySlug } from '@/entities/category/server';

import { SubcategoriesCompact } from '../../components/subcategoriesCompact/SubcategoriesCompact';
import { SideFiltersButton } from '../filtering/sideFilters/SideFiltersButton';
import { CategoryName } from './categoryName/CategoryName';
import { CategoryProductCountServer } from './categoryName/CategoryProductCountServer';
import { CategoryProductCountSkeleton } from './categoryName/CategoryProductCountSkeleton';
import { StickyBarWide } from './stickyHeader/StickyBarWide';
import { StickyHeader } from './stickyHeader/StickyHeader';

interface CategoryHeaderServerType {
    categorySlug: string;
    searchParams: string;
}

export const CategoryHeaderServer = async ({ categorySlug, searchParams }: CategoryHeaderServerType) => {
    const category = await getCachedCategoryWithChildrenBySlug(categorySlug);

    if (!category) notFound();

    const listingKey = `${categorySlug}?${searchParams}`;
    const productCount = (
        <Suspense key={listingKey} fallback={<CategoryProductCountSkeleton />}>
            <CategoryProductCountServer
                categorySlug={categorySlug}
                searchParams={searchParams}
            />
        </Suspense>
    );

    return (
        <StickyHeader>
            <StickyBarWide>
                <CategoryName name={category.name} productCount={productCount} />
                <SideFiltersButton />
            </StickyBarWide>
            <SubcategoriesCompact subcategories={category.children} />
        </StickyHeader>
    );
};
