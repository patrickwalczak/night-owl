import React from 'react';
import styles from './catalog.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import Subcategories from '../subcategories/Subcategories';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import ProductsInfinite from '../productsInfinite/ProductsInfinite';
import FiltersDialogMobile from '../filtersDialogMobile/FiltersDialogMobile';
import SideFiltersButton from '../sideFiltersButton/SideFiltersButton';
import SideFiltersDesktop from '../sideFiltersDesktop/SideFiltersDesktop';
import { ListingProductType } from '@/types/product.model';
import CategoryName from '../categoryName/CategoryName';

export default function CatalogView({ items, search }: { items: ListingProductType[]; search: URLSearchParams }) {
	return (
		<main className={mergeClasses(styles.container, 'flex', 'flex-col')}>
			<CategoryName />
			<Subcategories />
			<div className={mergeClasses(styles.stickyContainer, 'flex', 'flex-col', 'align-center', 'justify-between')}>
				<CategoryProductsTotal />
				<FiltersDialogMobile />
				<SideFiltersButton />
			</div>

			<div className={mergeClasses(styles.productsContainer, 'flex')}>
				<SideFiltersDesktop />
				<ProductsInfinite search={`?${search.toString()}`} initialItems={items} />
			</div>
		</main>
	);
}
