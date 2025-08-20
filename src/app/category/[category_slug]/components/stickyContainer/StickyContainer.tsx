'use client';

import React from 'react';
import styles from './stickyContainer.module.scss';
import { useAppSelector } from '@/lib/store/hooks';
import { mergeClasses } from '@/utils/mergeClasses';
import CategoryProductsTotal from '../categoryProductsTotal/CategoryProductsTotal';
import FiltersDialogMobile from '../filtersDialogMobile/FiltersDialogMobile';
import SideFiltersButton from '../sideFiltersButton/SideFiltersButton';
import CategoryName from '../categoryName/CategoryName';

const StickyContainer = () => {
	const isNavigationOpen = useAppSelector((state) => state.order.isNavigationOpen);

	return (
		<div
			className={mergeClasses(styles.stickyContainer, 'flex', 'align-center', 'justify-between', 'transition-200')}
			style={{ top: isNavigationOpen ? '0px' : '43px' }}
		>
			<CategoryName isProductSum />
			<CategoryProductsTotal />
			<FiltersDialogMobile />
			<SideFiltersButton />
		</div>
	);
};

export default StickyContainer;
