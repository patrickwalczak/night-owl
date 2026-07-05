import { AnimatePresence, motion } from 'framer-motion';
import { type RefObject } from 'react';

import type { RootCategoriesWithChildren } from '@/entities/category';

import { cn } from '@/shared/lib/utils';

import styles from './categoriesDropdown.module.scss';
import { DropdownCategory } from './DropdownCategory';

export const CategoriesDropdown = ({
    isExpanded,
    categories,
    controllerBtnRef,
}: {
    isExpanded: boolean;
    categories: RootCategoriesWithChildren;
    controllerBtnRef?: RefObject<HTMLButtonElement | null>;
}) => {
    const refCallback = () => {
        return () => {
            controllerBtnRef?.current?.focus();
        };
    };

    return (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.nav
                    ref={refCallback}
                    id={'catalog-dropdown'}
                    aria-labelledby={'catalog-button'}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={styles.dropdown}
                >
                    {categories.length
                        ? (
                            <ul className={cn(styles.wrapper)}>
                                {categories.map(category => (
                                    <DropdownCategory key={category.id} category={category} isRootCategory />
                                ))}
                            </ul>
                        )
                        : (
                            null
                        )}
                </motion.nav>
            )}
        </AnimatePresence>
    );
};
