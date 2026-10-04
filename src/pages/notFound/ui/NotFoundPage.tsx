import Image from 'next/image';
import Link from 'next/link';

import styles from './notFoundPage.module.scss';

export default function NotFoundPage() {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <p className={styles.eyebrow}>{'404 · Page not found'}</p>
                <p className={styles.code} aria-hidden>{'404'}</p>
                <h1 className={styles.heading}>{'Lost in the dark?'}</h1>
                <p className={styles.description}>
                    {'This page seems to have flown away. Let’s get you back to something a little brighter.'}
                </p>
                <div className={styles.actions}>
                    <Link href={'/'} className={styles.homeLink}>
                        <span aria-hidden>{'←'}</span>
                        {'Back to home'}
                    </Link>
                    <Link href={'/category/indoor-lighting'} className={styles.shopLink}>
                        {'Explore lighting'}
                        <span aria-hidden>{'↗'}</span>
                    </Link>
                </div>
            </div>
            <div className={styles.artwork}>
                <Image
                    src={'/not-found-owl.png'}
                    alt={'A curious owl perched on books beside the warm glow of a lamp.'}
                    width={1254}
                    height={1254}
                    sizes={'(min-width: 1280px) 580px, (min-width: 900px) 46vw, (min-width: 600px) 480px, 90vw'}
                    className={styles.illustration}
                />
            </div>
        </main>
    );
}
