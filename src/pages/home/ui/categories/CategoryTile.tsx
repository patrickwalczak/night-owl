import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils/cn';

import styles from './categories.module.scss';

interface CategoryTileType {
	href: string;
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
	};
}

export const CategoryTile = ({ href, title, description, image }: CategoryTileType) => {
	return (
		<Link className={styles.tile} href={href}>
			<Image className={styles.image} src={image.src} alt={image.alt} fill />

			<div className={styles.overlay} />

			<div className={cn(styles.content, 'flex', 'flex-col')}>
				<h3 className={cn(styles.title, 'h4', 'font-playfair')}>{title}</h3>
				<p className={styles.description}>{description}</p>
			</div>
		</Link>
	);
};
