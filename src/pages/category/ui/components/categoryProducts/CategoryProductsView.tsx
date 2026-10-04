import type { CategoryProductsPage } from '@/pages/category/model/categoryPage.types';
import type { ParsedFilters } from '@/pages/category/model/params/searchParams.types';

import { cn } from '@/shared/lib/utils';

import { FiltersDialog } from '../../sections/filtering/ui/filtersDialog/FiltersDialog';
import SideFiltersDesktop from '../../sections/filtering/ui/sideFilters/SideFiltersDesktop';
import { StickyHeader } from '../../sections/header/ui/stickyHeader/StickyHeader';
import { ProductsInfinite } from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import { CompactNav } from '../compactNavigation/CompactNav';
import styles from './categoryProducts.module.scss';

interface CategoryProductsViewType {
    initialProducts: CategoryProductsPage;
    appliedFilters: ParsedFilters;
}

export default function CategoryProductsView({ initialProducts, appliedFilters }: CategoryProductsViewType) {
    return (
        <main className={cn(styles.container)}>
            <StickyHeader />
            <div className={styles.productsContainer}>
                <SideFiltersDesktop />
                <ProductsInfinite initialProducts={initialProducts} appliedFilters={appliedFilters} />
            </div>
            <CompactNav>
                <FiltersDialog />
            </CompactNav>
        </main>
    );
}
