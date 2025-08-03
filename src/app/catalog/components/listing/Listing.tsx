import React from 'react';
import Product from '../product/Product';
import styles from './listing.module.scss';
import prisma from '../../../../../prisma/prisma';
import FilteringController from '../filteringController/FilteringController';
import SortingController from '../sortingController/SortingController';

const Listing = async () => {
	const products = [];

	return (
		<div className={styles.listingContainer}>
			<div className={styles.productControlsBar}>
				<h2 className={styles.productsHeading}>Products ({products.length})</h2>
				<div className={styles.productControlsButtons}>
					<FilteringController />
					<SortingController />
				</div>
			</div>
			<div className={styles.productsContainer}>
				{products.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Listing;
