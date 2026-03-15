'use client';

import Image from 'next/image';
import styles from './styles.module.scss';

export default function Categories() {
	return (
		<section className={styles.section}>
			<div className={styles.wrapper}>
				<div className={styles.gallery}>
					<figure className={styles.card}>
						<Image fill src="/outdoor_lamp.jpg" alt="Decorative lantern hanging outdoors" loading="lazy" />
					</figure>

					<figure className={styles.card}>
						<Image fill src="/indoor_kitchen.jpg" alt="Warm light over cozy restaurant tables" loading="lazy" />
					</figure>

					<figure className={styles.card}>
						<Image fill src="/ceiling_lamp.jpg" alt="Pendant lights by a staircase" loading="lazy" />
					</figure>
				</div>
			</div>
		</section>
	);
}
