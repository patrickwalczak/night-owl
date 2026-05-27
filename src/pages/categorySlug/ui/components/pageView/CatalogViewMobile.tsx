import styles from './catalogView.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import CategoryName from '../categoryName/CategoryName';
import Subcategories from '../subcategories/Subcategories';
import ProductsInfinite from '../../sections/productList/ui/productsInfinite/ProductsInfinite';
import StickyViewMobile from '../stickyContainer/StickyViewMobile';

export default function CatalogViewMobile() {
	return (
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			<CategoryName />
			<Subcategories />
			<StickyViewMobile />
			<div className={styles.productsContainer}>
				<ProductsInfinite />
			</div>
		</main>
	);
}
