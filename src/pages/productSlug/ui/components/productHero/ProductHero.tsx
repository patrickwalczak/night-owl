'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { type FullProduct } from '@/lib/serverActions/product';
import { addItem } from '@/lib/store/features/order/orderSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { formatPrice } from '@/utils/format';
import { mergeClasses } from '@/utils/mergeClasses';

import styles from './productHero.module.scss';

export default function ProductHero({ data }: { data: FullProduct }) {
    const dispatch = useAppDispatch();
    const { product } = data;
    const imgRef = useRef(null);

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
            }),
        );
    };

    return (
        <section className={styles.wrap}>
            <figure className={styles.stage}>
                <Image ref={imgRef} src={'https://placehold.co/600x400.webp'} alt={product.name} fill className={styles.img} />
                {product.status !== 'DEFAULT' && (
                    <div className={styles.badge}>
                        {product.status === 'NEW' && 'New'}
                        {product.status === 'SALE' && 'Sale'}
                        {product.status === 'PROMOTION' && 'Promotion'}
                    </div>
                )}
            </figure>

            <aside className={styles.box}>
                <h1 className={styles.title}>{product.name}</h1>
                <p className={styles.category}>
                    <a href={`/category/${product.category.slug}`}>{product.category.name}</a>
                </p>

                <p className={styles.price}>{formatPrice(product.price, product.currency)}</p>

                {product.description && <p className={styles.desc}>{product.description}</p>}

                <button
                    onClick={addProduct}
                    className={mergeClasses(styles.addToCart, 'transition-200')}
                    disabled={!product.inStock}
                >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </aside>
        </section>
    );
}
