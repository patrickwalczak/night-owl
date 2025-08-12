import { getCategoryProductCountDirect } from '@/lib/serverActions/category';
import React from 'react';

const CategoryProductsTotal = async ({ categoryId }: { categoryId: string }) => {
	const totalInCategory = await getCategoryProductCountDirect(categoryId);

	return <span>{totalInCategory} Results</span>;
};

export default CategoryProductsTotal;
