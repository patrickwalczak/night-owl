import React from 'react';
import styles from './product.module.scss';

interface ProductType {
	id: number;
	img_url: string;
	name: string;
	price: number;
}

interface ProductPropsType {
	product: ProductType;
}

const Product = ({ product }: ProductPropsType) => {
	return (
		<div className={styles.productContainer}>
			<div className={styles.imgPlaceholder} />
			<h3 className={styles.name}>{product.name}</h3>
			<p className={styles.price}>${product.price}</p>
			<div className={styles.cartIcon} />
		</div>
	);
};

export default Product;
