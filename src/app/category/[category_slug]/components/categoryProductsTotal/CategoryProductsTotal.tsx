'use client';

import { useSafeContext } from '@/hooks/useSafeContext';
import React from 'react';
import { CatalogContext } from '../catalog/CatalogProvider';

const CategoryProductsTotal = () => {
	const { productSum } = useSafeContext(CatalogContext);

	return <span>{productSum} Results</span>;
};

export default CategoryProductsTotal;
