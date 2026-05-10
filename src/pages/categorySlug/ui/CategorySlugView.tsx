'use client';

import styles from './categorySlug.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { useAppSelector } from '@/lib/store/hooks';
import CategoryName from './components/categoryName/CategoryName';
import StickyContainer from './components/stickyContainer/StickyContainer';
import Subcategories from './components/subcategories/Subcategories';
import SideFiltersDesktop from './sections/filtering/ui/sideFiltersDesktop/SideFiltersDesktop';
import ProductsInfinite from './sections/productList/ui/productsInfinite/ProductsInfinite';

export default function CategorySlugView() {
	const isDesktop = useAppSelector((state) => state.app.isDesktop);

	return (
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			{!isDesktop && <CategoryName />}
			{!isDesktop && <Subcategories />}
			<StickyContainer />

			<div className={mergeClasses(styles.productsContainer, 'flex')}>
				{isDesktop && <SideFiltersDesktop />}
				<ProductsInfinite />
			</div>
		</main>
	);
}
