'use client';

import type React from 'react';

import Link from 'next/link';

import { closeCart } from '@/features/orderState/model/orderSlice';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { formatPrice } from '@/shared/lib/utils/format';
import { cn } from '@/shared/lib/utils/cn';

import Modal from '../../shared/ui/modal/Modal';
import styles from './cartDrawer.module.scss';
import CartProduct from './ui/cartProduct/CartProduct';

const CartDrawer = () => {
	const { items, isCartOpen } = useAppSelector((state) => state.order);
	const dispatch = useAppDispatch();

	const handleClose = () => dispatch(closeCart());

	return (
		<Modal open={isCartOpen} onClose={handleClose}>
			<Modal.Overlay>
				<Modal.Wrapper
					id={'mobile-menu'}
					className={cn(styles.modal, 'flex', 'flex-col')}
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
						<div className={cn(styles.empty, 'flex', 'align-center', 'flex-col')}>
							<h4 className={styles.emptyText}>{'Your cart is empty'}</h4>
							<Link href={'/category/indoor-lighting'} className={styles.goToCatalog}>
								{'Go to Catalog'}
							</Link>
						</div>
					)}
				</Modal.Wrapper>
			</Modal.Overlay>
		</Modal>
	);
};

const CartProducts = ({ children }: { children: React.ReactNode }) => {
	return <div className={cn(styles.products, 'flex', 'flex-col')}>{children}</div>;
};

const CartHeader = () => {
	return (
		<div className={cn(styles.header, 'flex', 'align-center', 'justify-between')}>
			<h3 className={styles.heading}>{'Cart'}</h3>
			<Modal.CloseButton className={styles.closeModalBtn} />
		</div>
	);
};

const CartSummary = () => {
	const items = useAppSelector((state) => state.order.items);
	const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	const formattedTotal = formatPrice(total, 'USD');

	return (
		<div className={cn('flex', 'flex-col', 'justify-between', 'align-center', styles.summary)}>
			<div className={cn(styles.total, 'flex', 'align-center', 'justify-between')}>
				<span className={styles.totalLabel}>{'Total:'}</span>
				<span className={styles.totalValue}>{formattedTotal}</span>
			</div>
			<button className={styles.checkoutBtn}>{'Checkout'}</button>
		</div>
	);
};

export default CartDrawer;
