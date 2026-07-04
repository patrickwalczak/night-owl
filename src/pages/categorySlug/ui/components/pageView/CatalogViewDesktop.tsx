import { cn } from '@/shared/lib/utils';

import SideFiltersDesktop from '../../sections/filtering/ui/sideFiltersDesktop/SideFiltersDesktop';
import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import StickyViewDesktop from '../stickyContainer/StickyViewDesktop';
import styles from './catalogView.module.scss';

export default function CatalogContainer() {
    return (
        <main className={cn(styles.container, 'flex', 'flex-col')}>

            <StickyViewDesktop />

            <div className={styles.productsContainer}>
                <SideFiltersDesktop />
                <ProductsInfinite />
            </div>
        </main>
    );
}
