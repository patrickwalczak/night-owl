import React from 'react';
import styles from './product.module.scss';
import CartIcon from '../../../../../public/icons/cart.svg';

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
			<img alt={product.name} className={styles.img} src={product.img_url} />
			<div className={styles.detailsBox}>
				<h3 className={styles.name}>{product.name}</h3>
				<p className={styles.price}>${product.price}</p>
				<button className={styles.cartBtn}>
					<CartIcon />
				</button>
			</div>
		</div>
	);
};

export default Product;
