import { mergeClasses } from '@/utils/mergeClasses';
import Link from 'next/link';
import React from 'react';
import Modal from '../../modal/Modal';
import Cart from '../../icons/Cart';
import styles from './navigation.module.scss';
import { motion } from 'framer-motion';
import NavigationButton from '../navigationButton/NavigationButton';
import { CategoriesDropdownController } from '../categoriesDropdownController/CategoriesDropdownController';
import { useAppDispatch } from '@/lib/store/hooks';
import { openCart } from '@/lib/store/features/order/orderSlice';

const Menu = ({ isMenuOpened, closeMenu }: { isMenuOpened: boolean; closeMenu: () => void }) => {
	const dispatch = useAppDispatch();
	const openCartDrawer = () => dispatch(openCart());

	return (
		<Modal open={isMenuOpened} onClose={closeMenu}>
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
					<motion.div
						className={mergeClasses(styles.contentWrapper, 'flex', 'flex-col', 'align-center')}
						variants={{
							visible: { transition: { staggerChildren: 0.1 } },
						}}
						initial="hidden"
						animate="visible"
					>
						<HomeLink />
						<CategoriesDropdownController />

						<NavigationButton handleClick={openCartDrawer} className={'mobile-nav-element--border-bottom'}>
							<Cart className={styles.cartSvg} />
						</NavigationButton>
					</motion.div>
				</Modal.Wrapper>
			</Modal.Overlay>
		</Modal>
	);
};

export default Menu;

const HomeLink = () => (
	<motion.div
		className={mergeClasses(styles.linkWrapper, 'block', 'w-100')}
		variants={{
			hidden: { opacity: 0, rotate: -10, x: -20, y: -10 },
			visible: { opacity: 1, rotate: 0, x: 0, y: 0 },
		}}
		transition={{ duration: 0.4, ease: 'easeOut' }}
	>
		<Link className={mergeClasses('mobile-nav-element', 'block', 'w-100')} href={'/'}>
			{'Home'}
		</Link>
	</motion.div>
);
