import Image from 'next/image';
import Link from 'next/link';

import styles from './categories.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';

type CategoryTileType = {
	href: string;
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
	};
};

export const CategoryTile = ({ href, title, description, image }: CategoryTileType) => {
	return (
		<Link className={styles.tile} href={href}>
			<Image className={styles.image} src={image.src} alt={image.alt} fill />

			<div className={styles.overlay} />

			<div className={mergeClasses(styles.content, 'flex', 'flex-col')}>
				<h3 className={mergeClasses(styles.title, 'h4', 'font-playfair')}>{title}</h3>
				<p className={styles.description}>{description}</p>
			</div>
		</Link>
	);
};
