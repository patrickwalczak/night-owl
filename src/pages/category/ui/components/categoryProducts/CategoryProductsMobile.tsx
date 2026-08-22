import { cn } from '@/shared/lib/utils';

import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import CategoryName from '../categoryName/CategoryName';
import StickyViewMobile from '../stickyContainer/StickyViewMobile';
import Subcategories from '../subcategories/Subcategories';
import styles from './categoryProducts.module.scss';

export default function CategoryProductsMobile() {
    return (
        <main className={cn(styles.container, 'flex', 'flex-col')}>
            <CategoryName />
            <Subcategories />
            <StickyViewMobile />
            <div className={styles.productsContainer}>
                <ProductsInfinite />
            </div>
        </main>
    );
}
