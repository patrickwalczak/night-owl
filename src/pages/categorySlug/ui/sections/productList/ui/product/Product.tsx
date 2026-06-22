'use client';

import Image from 'next/image';
import { type KeyboardEventHandler, type MouseEventHandler } from 'react';

import { type ListingProductType } from '@/pages/categorySlug/model/product.types';
import { cn } from '@/shared/lib/utils/cn';
import Cart from '@/shared/ui/icons/Cart';

import styles from './product.module.scss';

export default function Product({ product }: { product: ListingProductType }) {
    const onCartClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
    };

    const onCartKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
    };

    return (
        <article
            className={cn(styles.card, 'transition-200')}
            tabIndex={0}
            role={'link'}
            aria-label={`Open ${product.name}`}
        >
            <div className={cn(styles.thumb)}>
                <Image src={'https://placehold.co/600x400.webp'} alt={product.name} fill className={styles.img} />
            </div>

            <div className={cn(styles.details, 'align-center')}>
                <h4 title={product.name} className={cn(styles.title, 'truncate')}>
                    {product.name}
                </h4>

                <div className={styles.bottomContainer}>
                    <p className={styles.price}>
                        {'$'}
                        {product.price}
                    </p>

                    <button
                        type={'button'}
                        className={cn(styles.cartBtn, 'button-empty', 'transition-200', 'flex-center')}
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
