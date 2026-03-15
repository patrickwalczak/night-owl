'use client';

import React from 'react';
import styles from './categoryName.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';
import { CatalogContext } from '../../providers/CatalogProvider';
import { mergeClasses } from '@/utils/mergeClasses';

const CategoryName = ({ isProductSum = false, isStuck = false }: { isProductSum?: boolean; isStuck?: boolean }) => {
	const {
		productSum,
		category: { name },
	} = useSafeContext(CatalogContext);

	return (
		<h2 className={mergeClasses(styles.categoryName, isStuck && styles.stuck, 'transition-200')}>
			{name}
			{isProductSum && ` (${productSum})`}
		</h2>
	);
};

export default CategoryName;
