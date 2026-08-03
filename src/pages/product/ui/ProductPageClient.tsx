'use client';

import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/app/store/client';
import { incrementDemoGlobalCount } from '@/features/appState/model/appSlice';

import { useProductDispatch, useProductSelector } from '../model/client';
import { decrementQuantity, incrementQuantity, setNotes } from '../model/productSlice';
import styles from './productPage.module.scss';

export default function ProductPageClient() {
    const appDispatch = useAppDispatch();
    const globalCount = useAppSelector(state => state.app.demoGlobalCount);
    const device = useAppSelector(state => state.app.device);

    const productDispatch = useProductDispatch();
    const { notes, quantity, slug } = useProductSelector(state => state.product);

    const otherSlug = slug === 'demo-one' ? 'demo-two' : 'demo-one';

    return (
        <main className={styles.page}>
            <h1>
                {'Product store demo: '}
                {slug}
            </h1>
            <p>
                {'This component is nested inside the product Redux Provider, but it can read and dispatch '}
                {'to both independent stores.'}
            </p>

            <section className={styles.card}>
                <h2>{'Page store'}</h2>
                <p>
                    {'Product: '}
                    <strong>{slug}</strong>
                </p>
                <div className={styles.row}>
                    <button type={'button'} onClick={() => productDispatch(decrementQuantity())}>
                        {'−'}
                    </button>
                    <output>
                        {'Quantity: '}
                        {quantity}
                    </output>
                    <button type={'button'} onClick={() => productDispatch(incrementQuantity())}>
                        {'+'}
                    </button>
                </div>
                <label className={styles.field}>
                    {'Local notes'}
                    <input
                        value={notes}
                        onChange={event => productDispatch(setNotes(event.target.value))}
                        placeholder={'This disappears after changing product'}
                    />
                </label>
            </section>

            <section className={styles.card}>
                <h2>{'Global store'}</h2>
                <p>
                    {'Device from global state: '}
                    {device}
                </p>
                <div className={styles.row}>
                    <output>
                        {'Global clicks: '}
                        {globalCount}
                    </output>
                    <button type={'button'} onClick={() => appDispatch(incrementDemoGlobalCount())}>
                        {'Increment global counter'}
                    </button>
                </div>
            </section>

            <Link className={styles.link} href={`/product/${otherSlug}`}>
                {'Open '}
                {otherSlug}
            </Link>
            <p className={styles.hint}>
                {'The page quantity and notes reset after this navigation. The global counter survives.'}
            </p>
        </main>
    );
}
