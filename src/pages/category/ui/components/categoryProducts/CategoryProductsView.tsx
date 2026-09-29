'use client';

import type { CategoryProductsPage } from '@/pages/category/model/categoryPage.types';
import type { ParsedFilters } from '@/pages/category/model/params/searchParams.types';

import { cn } from '@/shared/lib/utils';

import SideFiltersDesktop from '../../sections/filtering/ui/sideFiltersDesktop/SideFiltersDesktop';
import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import CategoryName from '../categoryName/CategoryName';
import StickyViewDesktop from '../stickyContainer/StickyViewDesktop';
import StickyViewMobile from '../stickyContainer/StickyViewMobile';
import Subcategories from '../subcategories/Subcategories';
import styles from './categoryProducts.module.scss';

interface CategoryProductsViewType {
    initialProducts: CategoryProductsPage;
    appliedFilters: ParsedFilters;
}

export default function CategoryProductsView({ initialProducts, appliedFilters }: CategoryProductsViewType) {
    return (
        <main className={cn(styles.container, 'flex', 'flex-col')}>
            {true
                ? (
                    <>
                        <StickyViewDesktop />
                        <div className={styles.productsContainer}>
                            <SideFiltersDesktop />
                            <ProductsInfinite initialProducts={initialProducts} appliedFilters={appliedFilters} />
                        </div>
                    </>
                )
                : (
                    <>
                        <CategoryName />
                        <Subcategories />
                        <StickyViewMobile />
                        <div className={styles.productsContainer}>
                            <ProductsInfinite initialProducts={initialProducts} appliedFilters={appliedFilters} />
                        </div>
                    </>
                )}
        </main>
    );
}
