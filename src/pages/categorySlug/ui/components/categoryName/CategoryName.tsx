'use client';

import styles from './categoryName.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { useSafeContext } from '@/shared/hooks/useSafeContext';
import { CatalogContext } from '@/pages/categorySlug/model/providers/CatalogProvider';

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
