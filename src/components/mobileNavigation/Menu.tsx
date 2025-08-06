import { mergeClasses } from '@/utils/mergeClasses';
import Link from 'next/link';
import React from 'react';
import Dialog from '../dialog/Dialog';
import Cart from '../icons/Cart';
import styles from './navigation.module.scss';

const Menu = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
	return (
		<Dialog open={isOpen} onClose={close}>
			<div className={mergeClasses(styles.contentWrapper, 'flex', 'flex-col', 'align-center')}>
				<ul className={mergeClasses(styles.list, 'flex', 'flex-col', 'align-center', 'w-100')}>
					<li className={mergeClasses(styles.listItem, 'block', 'w-100')}>
						<Link className={mergeClasses(styles.navElement, 'block', 'w-100')} href="/">
							Home
						</Link>
					</li>
					<li className={mergeClasses(styles.listItem, 'block', 'w-100')}>
						<Link className={mergeClasses(styles.navElement, 'block', 'w-100')} href="/catalog">
							Catalog
						</Link>
					</li>
				</ul>
				<button
					className={mergeClasses(
						styles.navElement,
						'button-empty',
						styles.button,
						styles.cartButton,
						'flex-center',
						'w-100'
					)}
				>
					<Cart />
				</button>
			</div>
		</Dialog>
	);
};

export default Menu;
