'use client';

import React from 'react';
import styles from './subcategories.module.scss';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store/hooks';

const Subcategories = () => {
	const subcategories = useAppSelector((state) => state.catalog.subcategories);

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
