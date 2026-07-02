import Image from 'next/image';
import Link from 'next/link';

import { getCategories } from '@/entities/category/server';
import { cn } from '@/shared/lib/utils/cn';

import styles from './hero.module.scss';

export const Hero = async () => {
    const categories = await getCategories();

    return (
        <section className={cn(styles.container, 'align-center', 'justify-center')}>
            <div className={`${styles.textContentContainer} flex flex-col align-center justify-center`}>
                <h1 className={styles.heading}>
                    <span>{'Lighting'}</span>
                    <span>{'That'}</span>
                    <span>{'Shines'}</span>
                    <span>{'Beyond'}</span>
                    <span>{'the'}</span>
                    <span>{'Darkness'}</span>
                </h1>

                <Link className={cn(styles.shopBtn, 'transition-200')} href={`/category/${categories[0].slug}`}>
                    {'Shop now'}
                </Link>
            </div>
            <Image
                className={styles.heroImage}
                src={'/owl.webp'}
                alt={'Decorative background with an owl'}
                width={3600}
                height={4500}
                sizes={'(max-width: 768px) 100vw, 40vw'}
                preload
            />
        </section>
    );
};
