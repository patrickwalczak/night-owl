import type { CategoryProductsPage } from '@/pages/category/model/categoryPage.types';
import type { ParsedFilters } from '@/pages/category/model/params/searchParams.types';

import { cn } from '@/shared/lib/utils';

import FiltersDialog from '../../sections/filtering/ui/filtersDialog/FiltersDialog';
import SideFiltersDesktop from '../../sections/filtering/ui/sideFilters/SideFiltersDesktop';
import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import { StickyBarWide } from '../stickyContainer/StickyBarWide';
import { Subcategories } from '../subcategories/Subcategories';
import styles from './categoryProducts.module.scss';

interface CategoryProductsViewType {
    initialProducts: CategoryProductsPage;
    appliedFilters: ParsedFilters;
}

export default function CategoryProductsView({ initialProducts, appliedFilters }: CategoryProductsViewType) {
    return (
        <main className={cn(styles.container, 'flex', 'flex-col')}>
            <StickyBarWide />
            <Subcategories />
            <FiltersDialog />
            <div className={styles.productsContainer}>
                <SideFiltersDesktop />
                <ProductsInfinite initialProducts={initialProducts} appliedFilters={appliedFilters} />
            </div>
        </main>
    );
}
