import React from 'react';
import styles from './product.module.scss';
import Cart from '@/components/icons/Cart';
import Image from 'next/image';
import { mergeClasses } from '@/utils/mergeClasses';
import { ListingProductType } from '@/types/product.model';

interface ProductType {
	product: ListingProductType;
}

const Product = ({ product }: ProductType) => {
	return (
		<div className={styles.productContainer}>
			<Image
				unoptimized
				width={600}
				height={400}
				alt={product.name}
				className={styles.img}
				src={'https://placehold.co/600x400'}
			/>
			<div className={styles.detailsBox}>
				<h3 className={styles.name}>{product.name}</h3>
				<p className={styles.price}>${product.price}</p>
				<button className={mergeClasses(styles.cartBtn, 'button-empty')}>
					<Cart />
				</button>
			</div>
		</div>
	);
};

export default Product;
