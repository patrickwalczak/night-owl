import React from 'react';
import styles from './hero.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { mergeClasses } from '@/utils/mergeClasses';
import { getCategoriesAction } from '@/actions/getCategoriesAction';

export const Hero = async () => {
	const categories = await getCategoriesAction();

	return (
		<section className={`${styles.container} align-center justify-center`}>
			<div className={`${styles.textContentContainer} flex flex-col align-center justify-center`}>
				<h1 className={styles.heading}>Lighting That Shines Beyond the Darkness</h1>
				<Link className={mergeClasses(styles.shopBtn, 'transition-200')} href={`/category/${categories[0].slug}`}>
					Shop now
				</Link>
			</div>
			<Image
				className={styles.heroImage}
				src={'/owl.webp'}
				alt={'Decorative background with an owl'}
				width={3600}
				height={4500}
				priority
			/>
		</section>
	);
};
