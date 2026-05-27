'use client';

import styles from './categorySlug.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import CategoryName from './components/categoryName/CategoryName';
import Subcategories from './components/subcategories/Subcategories';
import SideFiltersDesktop from './sections/filtering/ui/sideFiltersDesktop/SideFiltersDesktop';
import ProductsInfinite from './sections/productList/ui/productsInfinite/ProductsInfinite';
import StickyContainerDesktop from './components/stickyContainer/StickyContainerDesktop';
import StickyContainerMobile from './components/stickyContainer/StickyContainerMobile';

export default function CategorySlugView() {
	return (
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			<div className={styles.mobileHeader}>
				<CategoryName />
				<Subcategories />
			</div>

			<StickyContainerDesktop className={styles.desktopStickyContainer} />
			<StickyContainerMobile className={styles.mobileStickyContainer} />

			<div className={styles.productsContainer}>
				<SideFiltersDesktop />
				<ProductsInfinite />
			</div>
		</main>
	);
}
