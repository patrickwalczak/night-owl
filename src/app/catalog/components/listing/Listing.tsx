import React from 'react';
import Product from '../product/Product';
import styles from './listing.module.scss';
import prisma from '../../../../../prisma/prisma';

const Listing = async () => {
	const products = await prisma.product.findMany();

	return (
		<div className={styles.listingContainer}>
			{products.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
};

export default Listing;
