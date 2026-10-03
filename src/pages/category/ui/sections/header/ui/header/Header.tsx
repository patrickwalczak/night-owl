'use client';

import { StickyBarWide } from '@/pages/category/ui/components/stickyContainer/StickyBarWide';
import StickyContainer from '@/pages/category/ui/components/stickyContainer/StickyContainer';
import { Subcategories } from '@/pages/category/ui/components/subcategories/Subcategories';
import { cn } from '@/shared/lib/utils';

import styles from './Header.module.scss';

export const Header = () => {
    return (
        <StickyContainer>
            {({ isStuck }) => (
                <header className={cn(styles.header, { [styles.headerIsStuck]: isStuck })}>
                    <StickyBarWide isStuck={isStuck} />
                    <Subcategories />
                </header>
            )}
        </StickyContainer>
    );
};
