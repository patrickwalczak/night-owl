'use client';

import { useAppSelector } from '@/lib/store/hooks';
import React from 'react';

const CategoryProductsTotal = () => {
	const totalInCategory = useAppSelector((state) => state.catalog.productSum);

	return <span>{totalInCategory} Results</span>;
};

export default CategoryProductsTotal;
