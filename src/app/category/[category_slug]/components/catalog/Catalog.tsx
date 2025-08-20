import React from 'react';
import styles from './catalog.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import Subcategories from '../subcategories/Subcategories';
import ProductsInfinite from '../productsInfinite/ProductsInfinite';
import SideFiltersDesktop from '../sideFiltersDesktop/SideFiltersDesktop';
import { ListingProductType } from '@/types/product.model';
import CategoryName from '../categoryName/CategoryName';
import StickyContainer from '../stickyContainer/StickyContainer';

export default function CatalogView({ items, search }: { items: ListingProductType[]; search: URLSearchParams }) {
	return (
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			<CategoryName />
			<Subcategories />
			<StickyContainer />

			<div className={mergeClasses(styles.productsContainer, 'flex')}>
				<SideFiltersDesktop />
				<ProductsInfinite search={search.toString()} initialItems={items} />
			</div>
		</main>
	);
}
