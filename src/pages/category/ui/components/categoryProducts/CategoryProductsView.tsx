'use client';

import { useIsDesktop } from '@/features/layout/client';
import { cn } from '@/shared/lib/utils';

import SideFiltersDesktop from '../../sections/filtering/ui/sideFiltersDesktop/SideFiltersDesktop';
import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import CategoryName from '../categoryName/CategoryName';
import StickyViewDesktop from '../stickyContainer/StickyViewDesktop';
import StickyViewMobile from '../stickyContainer/StickyViewMobile';
import Subcategories from '../subcategories/Subcategories';
import styles from './categoryProducts.module.scss';

export default function CategoryProductsView() {
    const isDesktop = useIsDesktop();

    return (
        <main className={cn(styles.container, 'flex', 'flex-col')}>
            {isDesktop
                ? (
                    <>
                        <StickyViewDesktop />
                        <div className={styles.productsContainer}>
                            <SideFiltersDesktop />
                            <ProductsInfinite />
                        </div>
                    </>
                )
                : (
                    <>
                        <CategoryName />
                        <Subcategories />
                        <StickyViewMobile />
                        <div className={styles.productsContainer}>
                            <ProductsInfinite />
                        </div>
                    </>
                )}
        </main>
    );
}
