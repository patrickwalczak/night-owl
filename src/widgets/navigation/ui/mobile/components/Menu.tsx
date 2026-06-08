import { motion } from 'framer-motion';
import Link from 'next/link';

import { openCart } from '@/lib/store/features/order/orderSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { mergeClasses } from '@/shared/lib/utils/mergeClasses';

import Cart from '../../../../../shared/ui/icons/Cart';
import Modal from '../../../../../shared/ui/modal/Modal';
import styles from '../navigation.module.scss';
import { CategoriesDropdown } from './CategoriesDropdown';
import NavigationButton from './NavigationButton';

const Menu = ({ isMenuOpened, closeMenu }: { isMenuOpened: boolean; closeMenu: () => void }) => {
	const dispatch = useAppDispatch();
	const openCartDrawer = () => dispatch(openCart());

	return (
		<Modal open={isMenuOpened} onClose={closeMenu}>
			<Modal.Overlay>
				<Modal.Wrapper
					id={'mobile-menu'}
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
						initial={'hidden'}
						animate={'visible'}
					>
						<HomeLink />
						<CategoriesDropdown />

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
