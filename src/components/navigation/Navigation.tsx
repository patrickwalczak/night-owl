import Link from 'next/link';
import React from 'react';
import styles from './navigation.module.scss';

type Position = React.CSSProperties['position'];

const Navigation = ({ position }: { position: Position }) => {
	return (
		<nav className={styles.navigation} data-css-position={position}>
			<Link href="/">
				<h2 className={styles.logo}>Night Owl</h2>
			</Link>

			<ul className={styles.navigation__links}>
				<li>
					<Link className={styles.navigation__link} href="/">
						Home
					</Link>
				</li>
				<li>
					<Link className={styles.navigation__link} href="/catalog">
						Catalog
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
