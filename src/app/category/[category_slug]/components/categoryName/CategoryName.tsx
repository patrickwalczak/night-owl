'use client';

import React from 'react';
import styles from './categoryName.module.scss';
import { useAppSelector } from '@/lib/store/hooks';

const CategoryName = ({ isProductSum = false }: { isProductSum?: boolean }) => {
	const categoryName = useAppSelector((state) => state.catalog.category.name);
	const produtSum = useAppSelector((state) => state.catalog.productSum);

	return (
		<h2 className={styles.categoryName}>
			{categoryName}
			{isProductSum && ` (${produtSum})`}
		</h2>
	);
};

export default CategoryName;
