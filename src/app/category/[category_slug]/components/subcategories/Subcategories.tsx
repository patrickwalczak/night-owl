'use client';

import React from 'react';
import styles from './subcategories.module.scss';
import Link from 'next/link';
import { useSafeContext } from '@/hooks/useSafeContext';
import { CatalogContext } from '../catalog/CatalogProvider';

const Subcategories = () => {
	const { subcategories } = useSafeContext(CatalogContext);

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
