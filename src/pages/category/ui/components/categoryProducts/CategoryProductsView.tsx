import { cn } from '@/shared/lib/utils';

import type { CategoryProductsPage } from '../../../model/categoryPage.types';
import type { ParsedFilters } from '../../../model/params/searchParams.types';

import { CompactFilters } from '../../sections/filtering/compactFilters/CompactFilters';
import { SideFiltersDesktop } from '../../sections/filtering/sideFilters/SideFiltersDesktop';
import { StickyHeader } from '../../sections/header/stickyHeader/StickyHeader';
import { ProductsInfinite } from '../../sections/productList/productsInfinite/ProductsInfinite';
import { CompactNav } from '../compactNavigation/CompactNav';
import styles from './categoryProducts.module.scss';

interface CategoryProductsViewType {
    initialProducts: CategoryProductsPage;
    appliedFilters: ParsedFilters;
}

export const CategoryProductsView = ({ initialProducts, appliedFilters }: CategoryProductsViewType) => {
    return (
        <main className={cn(styles.container)}>
            <StickyHeader />
            <div className={styles.productsContainer}>
                <SideFiltersDesktop />
                <ProductsInfinite initialProducts={initialProducts} appliedFilters={appliedFilters} />
            </div>
            <CompactNav>
                <CompactFilters />
            </CompactNav>
        </main>
    );
};
