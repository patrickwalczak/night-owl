import Link from 'next/link';
import React from 'react';
import styles from './navigation.module.scss';
import Cart from '../icons/Cart';
import MobileNavigation from '../mobileNavigation/MobileNavigation';
import { mergeClasses } from '@/utils/mergeClasses';

const Navigation = () => {
	return (
		<header className={styles.header}>
			<nav className={mergeClasses(styles.nav)} aria-label="Main navigation">
				<Link href="/" aria-label="Go to homepage">
					<span className={styles.logo}>Night Owl</span>
				</Link>

				<div className={mergeClasses(styles.listWrapper, 'flex', 'align-center')}>
					<ul className={mergeClasses(styles.list, 'flex', 'align-center')}>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/catalog">Catalog</Link>
						</li>
					</ul>

					<div aria-hidden="true" />

					<button type="button" className={mergeClasses(styles.button, 'button-empty')} aria-label="Open cart">
						<Cart />
					</button>
				</div>

				<MobileNavigation />
			</nav>
		</header>
	);
};

export default Navigation;
