import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

import styles from './categories.module.scss';

interface CategoryTileType {
    href: string;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    };
}

export const CategoryTile = ({ href, title, description, image }: CategoryTileType) => {
    return (
        <Link className={styles.tile} href={href}>
            <Image
                className={styles.image}
                src={image.src}
                alt={image.alt}
                fill
                sizes={'(max-width: 1023px) 100vw, (max-width: 1535px) calc((100vw - 2.25rem) / 2), calc((100vw - 4rem) / 2)'}
                loading={'lazy'}
            />

            <div className={styles.overlay} />

            <div className={cn(styles.content, 'flex', 'flex-col')}>
                <h3 className={cn(styles.title, 'h4', 'font-playfair')}>{title}</h3>
                <p className={cn(styles.description, 'p')}>{description}</p>
            </div>
        </Link>
    );
};
