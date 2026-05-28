'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type KeyboardEventHandler, type MouseEventHandler } from 'react';

import { addItem } from '@/lib/store/features/order/orderSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import Cart from '@/shared/ui/icons/Cart';
import { type ListingProductType } from '@/types/product.model';
import { mergeClasses } from '@/utils/mergeClasses';

import styles from './product.module.scss';

export default function Product({ product }: { product: ListingProductType }) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const productUrl = `/product/${product.slug}`;

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

    const goToProduct = () => router.push(productUrl);

    const onCardClick = () => goToProduct();

    const onCardKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
        if (e.target !== e.currentTarget) return;

        if (e.key === 'Enter') {
            e.preventDefault();
            goToProduct();
        }
        if (e.key === ' ') {
            e.preventDefault();
            goToProduct();
        }
    };

    const onCartClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        addProduct();
    };

    const onCartKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
    };

    return (
        <article
            className={mergeClasses(styles.card, 'transition-200')}
            tabIndex={0}
            role={'link'}
            aria-label={`Open ${product.name}`}
            onClick={onCardClick}
            onKeyDown={onCardKeyDown}
        >
            <div className={mergeClasses(styles.thumb)}>
                <Image src={'https://placehold.co/600x400.webp'} alt={product.name} fill className={styles.img} />
            </div>

            <div className={mergeClasses(styles.details, 'align-center')}>
                <h4 title={product.name} className={mergeClasses(styles.title, 'truncate')}>
                    {product.name}
                </h4>

                <div className={styles.bottomContainer}>
                    <p className={styles.price}>
                        {'$'}
                        {product.price}
                    </p>

                    <button
                        type={'button'}
                        className={mergeClasses(styles.cartBtn, 'button-empty', 'transition-200', 'flex-center')}
                        aria-label={`Add “${product.name}” to cart`}
                        onClick={onCartClick}
                        onKeyDown={onCartKeyDown}
                    >
                        <Cart />
                        <span className={'sr-only'}>{'Add to cart'}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}
