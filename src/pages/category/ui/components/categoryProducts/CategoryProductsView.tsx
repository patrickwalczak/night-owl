import { cn } from '@/shared/lib/utils';

import type { CategoryProductsPage } from '../../../model/categoryPage.types';
import type { ParsedFilters, SortOrderType } from '../../../model/params/searchParams.types';

import { CompactFilters } from '../../sections/filtering/compactFilters/CompactFilters';
import { SideFiltersDesktop } from '../../sections/filtering/sideFilters/SideFiltersDesktop';
import { StickyHeader } from '../../sections/header/stickyHeader/StickyHeader';
import { ProductsInfinite } from '../../sections/productList/productsInfinite/ProductsInfinite';
import { CompactNav } from '../compactNavigation/CompactNav';
import styles from './categoryProducts.module.scss';

interface CategoryProductsViewType {
    initialProducts: CategoryProductsPage;
    appliedFilters: ParsedFilters;
    sort: SortOrderType;
}

export const CategoryProductsView = ({ initialProducts, appliedFilters, sort }: CategoryProductsViewType) => {
    return (
        <main className={cn(styles.container)}>
            <StickyHeader />
            <div className={styles.productsContainer}>
                <SideFiltersDesktop parameters={[]} />
                <ProductsInfinite initialProducts={initialProducts} appliedFilters={appliedFilters} sort={sort} />
            </div>
            <CompactNav>
                <CompactFilters />
            </CompactNav>
        </main>
    );
};
