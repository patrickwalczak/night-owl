import { StickyBarWide } from '@/pages/category/ui/components/stickyContainer/StickyBarWide';
import { Subcategories } from '@/pages/category/ui/components/subcategories/Subcategories';

import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <StickyBarWide />
            <Subcategories />
        </header>
    );
};
