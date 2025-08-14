'use client';

import React from 'react';
import styles from './categoryName.module.scss';
import { useAppSelector } from '@/lib/store/hooks';

const CategoryName = () => {
	const categoryName = useAppSelector((state) => state.catalog.category.name);

	return <h2 className={styles.categoryName}>{categoryName}</h2>;
};

export default CategoryName;
