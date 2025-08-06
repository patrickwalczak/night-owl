import Link from 'next/link';
import React from 'react';
import styles from './navigation.module.scss';
import Cart from '../icons/Cart';
import MobileNavigation from './MobileNavigation';

const Navigation = () => {
	return (
		<nav className={`${styles.nav}`}>
			<Link href="/">
				<h2 className={styles.logo}>Night Owl</h2>
			</Link>

			<ul className={styles.links}>
				<li>
					<Link className={styles.link} href="/">
						Home
					</Link>
				</li>
				<li>
					<Link className={styles.link} href="/catalog">
						Catalog
					</Link>
				</li>
			</ul>
			<button className={`${styles.button} ${styles.cartButton} button-empty`}>
				<Cart />
			</button>

			{/* <MobileNavigation /> */}
		</nav>
	);
};

export default Navigation;
