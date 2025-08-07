import { mergeClasses } from '@/utils/mergeClasses';
import Link from 'next/link';
import React from 'react';
import Modal from '../modal/Modal';
import Cart from '../icons/Cart';
import styles from './navigation.module.scss';
import { motion } from 'framer-motion';

const links = ['Home', 'Catalog'];

const Menu = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
	return (
		<Modal open={isOpen} onClose={close}>
			<Modal.Overlay>
				<Modal.Wrapper
					id="mobile-menu"
					className={styles.modal}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.4 }}
				>
					<Modal.CloseButton className={styles.closeModalBtn} />
					<div className={mergeClasses(styles.contentWrapper, 'flex', 'flex-col', 'align-center')}>
						<motion.ul
							className={mergeClasses(styles.list, 'flex', 'flex-col', 'align-center', 'w-100')}
							initial="hidden"
							animate="visible"
							variants={{
								visible: { transition: { staggerChildren: 0.1 } },
							}}
						>
							{links.map((label) => (
								<MenuLink key={label} label={label} />
							))}
						</motion.ul>
						<CartButton />
					</div>
				</Modal.Wrapper>
			</Modal.Overlay>
		</Modal>
	);
};

const MenuLink = ({ label }: { label: string }) => (
	<motion.li
		key={label}
		className={mergeClasses(styles.listItem, 'block', 'w-100')}
		variants={{
			hidden: { opacity: 0, rotate: -10, x: -20, y: -10 },
			visible: { opacity: 1, rotate: 0, x: 0, y: 0 },
		}}
		transition={{ duration: 0.4, ease: 'easeOut' }}
	>
		<Link className={mergeClasses(styles.navElement, 'block', 'w-100')} href={label === 'Home' ? '/' : '/catalog'}>
			{label}
		</Link>
	</motion.li>
);

const CartButton = () => (
	<motion.button
		className={mergeClasses(
			styles.navElement,
			'button-empty',
			styles.button,
			styles.cartButton,
			'flex-center',
			'w-100'
		)}
		initial={{ opacity: 0, x: -30, rotate: -10 }}
		animate={{ opacity: 1, x: 0, rotate: 0 }}
		transition={{ delay: 0.2, duration: 0.4 }}
	>
		<Cart />
	</motion.button>
);

export default Menu;
