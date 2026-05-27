import styles from './catalogView.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import SideFiltersDesktop from '../../sections/filtering/ui/sideFiltersDesktop/SideFiltersDesktop';
import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import StickyViewDesktop from '../stickyContainer/StickyViewDesktop';

export default function CatalogContainer() {
	return (
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			<StickyViewDesktop />

			<div className={styles.productsContainer}>
				<SideFiltersDesktop />
				<ProductsInfinite />
			</div>
		</main>
	);
}
