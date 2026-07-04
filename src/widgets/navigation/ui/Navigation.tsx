'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useRef } from 'react';

import type { CategoryTree } from '@/entities/category';

import { useAppSelector } from '@/app/store/client';
import { cn } from '@/shared/lib/utils';

import useIsDropdownExpanded from '../hooks/useIsDropdownExpanded';
import useIsScrolled from '../hooks/useIsScrolled';
import Overlay from './components/Overlay';
import { CategoriesDropdown } from './desktop/categoriesDropdown/CategoriesDropdown';
import MobileNavigation from './mobile/MobileNavigation';
import styles from './navigation.module.scss';

interface NavigationContextType {
    categories: CategoryTree;
    isExpanded: boolean;
    isScrolled: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    hideDropdown: () => void;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);

const Navigation = ({ categories }: { categories: CategoryTree }) => {
    const isDesktop = useAppSelector(state => state.app.isDesktop);

    const { isScrolled, direction } = useIsScrolled();
    const { expandDropdown, hideDropdown, isExpanded, setIsExpanded } = useIsDropdownExpanded();

    const catalogBtnRef = useRef<HTMLButtonElement | null>(null);

    const mainEl = useRef<HTMLElement | null>(null);

    const pathname = usePathname();
    const isHomepage = pathname === '/';

    const ctx = {
        categories,
        isExpanded,
        isScrolled,
        setIsExpanded,
        hideDropdown,
    };

    // Hide dropdown on keys down
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'ArrowUp') {
            e.stopPropagation();
            hideDropdown();
            catalogBtnRef.current?.focus();
        }
    };

    const handleKeyDownOnButton = (e: React.KeyboardEvent) => {
        // Enter toggles dropdown
        if (e.key === 'Enter') {
            e.stopPropagation();
            setIsExpanded(prev => !prev);
            // Arrow down expands dropdown
        }
        else if (e.key === 'ArrowDown') {
            e.stopPropagation();
            expandDropdown();
        }
    };

    const toggleDropdown = () => setIsExpanded(prev => !prev);

    // Keep the main content inactive while the navigation overlay is open
    // so users cannot click or focus elements behind it.
    useEffect(() => {
        mainEl.current = document.querySelector('main');

        if (mainEl.current && isExpanded) {
            mainEl.current.setAttribute('inert', String(isExpanded));
        }
        else if (mainEl.current) {
            mainEl.current.removeAttribute('inert');
        }

        return () => mainEl.current?.removeAttribute('inert');
    }, [isExpanded]);

    return (
        <NavigationContext.Provider value={ctx}>
            <header
                className={cn(
                    styles.header,
                    isHomepage && styles.isHomepage,
                    isScrolled && styles.isScrolled,
                    isExpanded && styles.isDropdownExpanded,
                    direction === 'down' && styles.isHidden,
                    'transition-200',
                )}
                onKeyDown={onKeyDown}
            >
                <nav className={cn(styles.nav, 'transition-200')} aria-label={'Main navigation'}>
                    <Link className={cn(styles.logoLink)} href={'/'}>
                        <span className={cn(styles.logo, 'transition-200')}>{'Night Owl'}</span>
                    </Link>

                    {isDesktop && (
                        <div className={cn(styles.listWrapper, 'flex', 'align-center')}>
                            <button
                                ref={catalogBtnRef}
                                onClick={toggleDropdown}
                                type={'button'}
                                className={cn(styles.catalogButton, 'button-empty')}
                                aria-haspopup={'true'}
                                aria-expanded={isExpanded}
                                aria-controls={'catalog-dropdown'}
                                id={'catalog-button'}
                                onKeyDown={handleKeyDownOnButton}
                            >
                                {'Catalog'}
                            </button>
                        </div>
                    )}

                    {!isDesktop && <MobileNavigation />}
                </nav>
                <CategoriesDropdown controllerBtnRef={catalogBtnRef} isExpanded={isExpanded} categories={categories} />
            </header>
            <Overlay open={isExpanded} onClose={hideDropdown} zIndex={2} />
        </NavigationContext.Provider>
    );
};

export default Navigation;
