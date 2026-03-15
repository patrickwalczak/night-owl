'use client';

import { useRef } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type RelatedProduct = {
	id: string;
	name: string;
	slug: string;
	price: number;
	image: string;
	status: 'DEFAULT' | 'NEW' | 'SALE' | 'PROMOTION';
};

export default function RelatedProducts({ products }: { products: RelatedProduct[] }) {
	const containerRef = useRef<HTMLDivElement>(null);

	const scrollByAmount = (amount: number) => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
		}
	};

	return (
		<section className={styles.wrap}>
			<div className={styles.header}>
				<h2>Related Products</h2>
				<div className={styles.controls}>
					<button aria-label="Scroll left" onClick={() => scrollByAmount(-300)}>
						‹
					</button>
					<button aria-label="Scroll right" onClick={() => scrollByAmount(300)}>
						›
					</button>
				</div>
			</div>

			<div ref={containerRef} className={styles.slider}>
				{products.map((p) => (
					<Product key={p.id} product={p} />
				))}
			</div>
		</section>
	);
}

const Product = ({ product }: { product: RelatedProduct }) => {
	return (
		<Link key={product.id} href={`/product/${product.slug}`} className={styles.card}>
			<div className={styles.imgWrap}>
				<Image src={'https://placehold.co/600x400.webp'} alt={product.name} fill className={styles.img} />
				{product.status !== 'DEFAULT' && (
					<span className={`${styles.badge} ${styles[`status${product.status}`]}`}>{product.status}</span>
				)}
			</div>
			<div className={styles.info}>
				<h3>{product.name}</h3>
				<p className={styles.price}>${product.price.toFixed(2)}</p>
			</div>
		</Link>
	);
};
