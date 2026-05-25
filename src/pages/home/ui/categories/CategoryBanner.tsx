import Link from 'next/link';

import styles from './categoryBanner.module.scss';

type CategoryBannerType = {
	href: string;
	title: string;
	description: string;
	linkLabel: string;
};

export const CategoryBanner = ({ href, title, description, linkLabel }: CategoryBannerType) => {
	return (
		<section className={styles.banner}>
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>

				<p className={styles.description}>{description}</p>

				<Link className={styles.link} href={href}>
					{linkLabel}
				</Link>
			</div>
		</section>
	);
};
