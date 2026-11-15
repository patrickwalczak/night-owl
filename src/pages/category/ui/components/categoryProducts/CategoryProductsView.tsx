import { Suspense } from 'react';

import { cn } from '@/shared/lib/utils';

import { CompactFilters } from '../../sections/filtering/compactFilters/CompactFilters';
import { FilterParametersServer } from '../../sections/filtering/FilterParametersServer';
import { FilterParametersSkeleton } from '../../sections/filtering/FilterParametersSkeleton';
import { FiltersServer } from '../../sections/filtering/FiltersServer';
import { SideFiltersDesktopSkeleton } from '../../sections/filtering/sideFilters/SideFiltersDesktopSkeleton';
import { CategoryProductCountServer } from '../../sections/header/categoryName/CategoryProductCountServer';
import { CategoryProductCountSkeleton } from '../../sections/header/categoryName/CategoryProductCountSkeleton';
import { StickyHeader } from '../../sections/header/stickyHeader/StickyHeader';
import { CategoryProductsServer } from '../../sections/productList/CategoryProductsServer';
import { ProductsSkeleton } from '../../sections/productList/ProductsSkeleton';
import { CompactNav } from '../compactNavigation/CompactNav';
import styles from './categoryProducts.module.scss';

interface CategoryProductsViewType {
    categorySlug: string;
    searchParams: string;
}

export const CategoryProductsView = ({ categorySlug, searchParams }: CategoryProductsViewType) => {
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
        <main className={cn(styles.container)}>
            <StickyHeader productCount={productCount} />
            <div className={styles.productsContainer}>
                <Suspense key={categorySlug} fallback={<SideFiltersDesktopSkeleton />}>
                    <FiltersServer categorySlug={categorySlug} />
                </Suspense>
                <Suspense key={listingKey} fallback={<ProductsSkeleton />}>
                    <CategoryProductsServer categorySlug={categorySlug} searchParams={searchParams} />
                </Suspense>
            </div>
            <CompactNav>
                <CompactFilters>
                    <Suspense key={categorySlug} fallback={<FilterParametersSkeleton />}>
                        <FilterParametersServer categorySlug={categorySlug} />
                    </Suspense>
                </CompactFilters>
            </CompactNav>
        </main>
    );
};
