import React from 'react';
import Product from '../product/Product';
import styles from './listing.module.scss';
import FilteringController from '../filteringController/FilteringController';
import SortingController from '../sortingController/SortingController';

const products = [
	{
		id: 1,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 2,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 3,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 4,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 5,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 6,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 7,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 8,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 9,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 10,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 11,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 12,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 13,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 14,
		name: 'Product 1',
		price: 19.99,
	},
	{
		id: 15,
		name: 'Product 1',
		price: 19.99,
	},
];

const Listing = async () => {
	return (
		<div className={styles.listingContainer}>
			<div className={styles.productControlsBar}>
				<h2 className={styles.productsHeading}>Category name ({products.length})</h2>
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
