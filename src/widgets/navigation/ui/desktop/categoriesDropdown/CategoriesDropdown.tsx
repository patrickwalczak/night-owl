import type React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { useSafeContext } from '@/shared/hooks/useSafeContext';
import { type SimpleCategoryModelType } from '@/types/category.model';
import { mergeClasses } from '@/utils/mergeClasses';

import { NavigationContext } from '../../Navigation';
import styles from './categoriesDropdown.module.scss';

const CategoriesDropdown = ({
    isExpanded,
    categories,
    controllerBtnRef,
}: {
    isExpanded: boolean;
    categories: SimpleCategoryModelType[];
    controllerBtnRef?: React.RefObject<HTMLButtonElement | null>;
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
                            <ul className={mergeClasses(styles.wrapper)}>
                                {categories.map(category => (
                                    <Category key={category.id} category={category} isRootCategory />
                                ))}
                            </ul>
                        )
                        : (
                            <NoCategoriesMessage />
                        )}
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default CategoriesDropdown;

const Category = ({
    category,
    isRootCategory = false,
}: {
    category: Pick<SimpleCategoryModelType, 'id' | 'name' | 'slug' | 'children'>;
    isRootCategory?: boolean;
}) => {
    const { setIsExpanded } = useSafeContext(NavigationContext);

    const handleClick = () => {
        setIsExpanded(false);
    };

    return (
        <>
            <li key={category.id}>
                <Link
                    onClick={handleClick}
                    className={mergeClasses('nav-hover-underline', styles.dropdownLink, isRootCategory && styles.isRootCategory)}
                    href={`/category/${category.slug}`}
                >
                    {category.name}
                </Link>
            </li>

            {category.children.length
                ? category.children.map(child => <Category key={child.id} category={{ children: [], ...child }} />)
                : null}
        </>
    );
};

const NoCategoriesMessage = () => (
    <p className={mergeClasses('mobile-nav-element', styles.noCategories)}>{'No categories available'}</p>
);
