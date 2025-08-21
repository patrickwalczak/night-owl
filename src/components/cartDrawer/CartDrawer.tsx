'use client';

import React from 'react';
import styles from './cartDrawer.module.scss';
import Modal from '../modal/Modal';
import { mergeClasses } from '@/utils/mergeClasses';
import CartProduct from '../cartProduct/CartProduct';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { closeCart } from '@/lib/store/features/order/orderSlice';
import Link from 'next/link';
import { formatPrice } from '@/utils/format';

const CartDrawer = () => {
	const { items, isCartOpen } = useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();

	const handleClose = () => dispatch(closeCart());

	return (
		<Modal open={isCartOpen} onClose={handleClose}>
			<Modal.Overlay>
				<Modal.Wrapper
					id="mobile-menu"
					className={mergeClasses(styles.modal, 'flex', 'flex-col')}
					initial={{ x: '100%' }}
					animate={{ x: 0 }}
					exit={{ x: '100%' }}
					transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
				>
					<CartHeader />
					{items.length ? (
						<div className={styles.content}>
							<CartProducts>
								{items.map((item) => (
									<CartProduct key={item.id} item={item} />
								))}
							</CartProducts>
							<CartSummary />
						</div>
					) : (
						<div className={mergeClasses(styles.empty, 'flex', 'align-center', 'flex-col')}>
							<h4 className={styles.emptyText}>Your cart is empty</h4>
							<Link href={'/category/indoor-lighting'} className={styles.goToCatalog}>
								Go to Catalog
							</Link>
						</div>
					)}
				</Modal.Wrapper>
			</Modal.Overlay>
		</Modal>
	);
};

const CartProducts = ({ children }: { children: React.ReactNode }) => {
	return <div className={mergeClasses(styles.products, 'flex', 'flex-col')}>{children}</div>;
};

const CartHeader = () => {
	return (
		<div className={mergeClasses(styles.header, 'flex', 'align-center', 'justify-between')}>
			<h3 className={styles.heading}>Cart</h3>
			<Modal.CloseButton className={styles.closeModalBtn} />
		</div>
	);
};

const CartSummary = () => {
	const items = useAppSelector((state) => state.order.items);
	const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const formattedTotal = formatPrice(total, 'USD');

	return (
		<div className={mergeClasses('flex', 'flex-col', 'justify-between', 'align-center', styles.summary)}>
			<div className={mergeClasses(styles.total, 'flex', 'align-center', 'justify-between')}>
				<span className={styles.totalLabel}>Total:</span>
				<span className={styles.totalValue}>{formattedTotal}</span>
			</div>
			<button className={styles.checkoutBtn}>Checkout</button>
		</div>
	);
};

export default CartDrawer;
