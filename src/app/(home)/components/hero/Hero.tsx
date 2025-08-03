import React from 'react';
import styles from './hero.module.scss';
import Image from 'next/image';

export const Hero = () => {
	return (
		<section className={styles.container}>
			<div className={styles.textContentContainer}>
				<h1 className={styles.heading}>Lighting That Shines Beyond the Darkness</h1>
				<button className={styles.shopBtn}>Shop now</button>
			</div>
			<Image className={styles.heroImage} src={'/owl.webp'} alt={'Hero Image'} width={3600} height={4500} priority />
		</section>
	);
};
