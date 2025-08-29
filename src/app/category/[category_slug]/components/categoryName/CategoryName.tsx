'use client';

import React from 'react';
import styles from './categoryName.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';
import { CatalogContext } from '../../providers/CatalogProvider';

const CategoryName = ({ isProductSum = false }: { isProductSum?: boolean }) => {
	const {
		productSum,
		category: { name },
	} = useSafeContext(CatalogContext);

	return (
		<h2 className={styles.categoryName}>
			{name}
			{isProductSum && ` (${productSum})`}
		</h2>
	);
};

export default CategoryName;
