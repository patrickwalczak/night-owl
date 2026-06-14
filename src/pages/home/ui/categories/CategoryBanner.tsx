import Link from 'next/link';

import { cn } from '@/shared/lib/utils/cn';

import styles from './categoryBanner.module.scss';

interface CategoryBannerType {
	href: string;
	title: string;
	description: string;
	linkLabel: string;
}

export const CategoryBanner = ({ href, title, description, linkLabel }: CategoryBannerType) => {
	return (
		<div className={styles.banner}>
			<div className={styles.content}>
				<h3 className={cn(styles.title, 'h3', 'font-playfair')}>{title}</h3>

				<p className={styles.description}>{description}</p>

				<Link className={cn(styles.link)} href={href}>
					{linkLabel}
				</Link>
			</div>
		</div>
	);
};
