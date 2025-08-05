'use client';

import React from 'react';
import styles from './navigation.module.scss';
import Hamburger from '../icons/Hamburger';
import Link from 'next/link';
import Cart from '../icons/Cart';
import useOpenState from '@/hooks/useIsOpenState';
import Dialog from '../dialog/Dialog';

const MobileNavigation = () => {
	const { isOpen, close, open } = useOpenState();

	return (
		<>
			<Dialog open={isOpen} onClose={close}>
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
				<button className={`${styles.button} button-empty`}>
					<Cart />
				</button>
			</Dialog>

			<button className={`${styles.button} button-empty`} onClick={open}>
				<Hamburger />
			</button>
		</>
	);
};

export default MobileNavigation;
