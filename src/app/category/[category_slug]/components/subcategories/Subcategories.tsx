import React from 'react';
import styles from './subcategories.module.scss';
import { getSubcategories } from '@/lib/catalog/data';
import Link from 'next/link';

const Subcategories = async ({ categoryId }: { categoryId: string }) => {
	const subcategories = await getSubcategories(categoryId);

	if (!subcategories.length) return null;

	return (
		<div className={styles.ribbon}>
			<div className={styles.scroller}>
				{subcategories.map((s) => (
					<Link key={s.id} href={`/category/${s.slug}`} className={styles.pill}>
						{s.name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Subcategories;
