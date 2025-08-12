import React from 'react';
import styles from './subcategories.module.scss';
import { getSubcategories } from '@/lib/serverActions/category';
import Link from 'next/link';

const Subcategories = async ({ categoryId }: { categoryId: string }) => {
	const subcategories = await getSubcategories(categoryId);

	if (!subcategories.length) return null;

	return (
		<div className={styles.ribbon}>
			<div className={styles.scroller}>
				{subcategories.map((subcategory) => (
					<Link key={subcategory.id} href={`/category/${subcategory.slug}`} className={styles.pill}>
						{subcategory.name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Subcategories;
