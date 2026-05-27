'use client';

import { CatalogContext } from '../../../model/providers/CatalogProvider';
import { useSafeContext } from '@/shared/hooks/useSafeContext';

const CategoryProductsTotal = () => {
	const { productSum } = useSafeContext(CatalogContext);

	return <span className="text-sm">{productSum} results</span>;
};

export default CategoryProductsTotal;
