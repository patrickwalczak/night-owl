'use client';

import React from 'react';
import { CatalogContext } from '../../../model/providers/CatalogProvider';
import { useSafeContext } from '@/shared/hooks/useSafeContext';

const CategoryProductsTotal = () => {
	const { productSum } = useSafeContext(CatalogContext);

	return <span>{productSum} Results</span>;
};

export default CategoryProductsTotal;
