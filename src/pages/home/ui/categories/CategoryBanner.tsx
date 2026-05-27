import Link from 'next/link';

import styles from './categoryBanner.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';

type CategoryBannerType = {
	href: string;
	title: string;
	description: string;
	linkLabel: string;
};

export const CategoryBanner = ({ href, title, description, linkLabel }: CategoryBannerType) => {
	return (
		<div className={styles.banner}>
			<div className={styles.content}>
				<h3 className={mergeClasses(styles.title, 'h3', 'font-playfair')}>{title}</h3>

				<p className={styles.description}>{description}</p>

				<Link className={mergeClasses(styles.link)} href={href}>
					{linkLabel}
				</Link>
			</div>
		</div>
	);
};
