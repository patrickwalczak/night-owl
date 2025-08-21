import React from 'react';
import styles from './product.module.scss';
import Cart from '@/components/icons/Cart';
import Image from 'next/image';
import { mergeClasses } from '@/utils/mergeClasses';
import { ListingProductType } from '@/types/product.model';
import { useAppDispatch } from '@/lib/store/hooks';
import { addItem } from '@/lib/store/features/order/orderSlice';

type Props = { product: ListingProductType };

export default function Product({ product }: Props) {
	const dispatch = useAppDispatch();

	const addProduct = () => {
		dispatch(
			addItem({
				id: product.id,
				name: product.name,
				image: '',
				price: product.price,
				quantity: 1,
				stock: 99,
				currency: product.currency,
			})
		);
	};

	return (
		<article className={mergeClasses(styles.card, 'transition-200')}>
			<div className={mergeClasses(styles.thumb, 'w-100')}>
				<Image
					src={'https://placehold.co/600x400.webp'}
					alt={product.name}
					fill
					priority={false}
					className={styles.img}
				/>
			</div>

			<div className={mergeClasses(styles.details, 'align-center')}>
				<h3 title={product.name} className={mergeClasses(styles.title, 'truncate')}>
					{product.name}
				</h3>

				<div className={styles.bottomContainer}>
					<p className={styles.price}>${product.price}</p>
					<button
						type="button"
						className={mergeClasses(styles.cartBtn, 'button-empty', 'transition-200', 'flex-center')}
						aria-label={`Add “${product.name}” to cart`}
						onClick={addProduct}
					>
						<Cart />
						<span className="sr-only">Add to cart</span>
					</button>
				</div>
			</div>
		</article>
	);
}
