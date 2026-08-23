'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useRef } from 'react';

import type { RootCategoriesWithChildren } from '@/entities/category';

import { useIsDesktop } from '@/features/appState/client';
import { cn } from '@/shared/lib/utils';
import { Overlay } from '@/shared/ui/overlay';

import useIsDropdownExpanded from '../hooks/useIsDropdownExpanded';
import useIsScrolled from '../hooks/useIsScrolled';
import { CategoriesDropdown } from './desktop/categoriesDropdown/CategoriesDropdown';
import MobileNavigation from './mobile/MobileNavigation';
import styles from './navigation.module.scss';

interface NavigationContextType {
    categories: RootCategoriesWithChildren;
    isExpanded: boolean;
    isScrolled: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    hideDropdown: () => void;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);

const Navigation = ({ categories }: { categories: RootCategoriesWithChildren }) => {
    const isDesktop = useIsDesktop();

    const { isScrolled, direction } = useIsScrolled();
    const { expandDropdown, hideDropdown, isExpanded, setIsExpanded } = useIsDropdownExpanded();

    const categoriesButtonRef = useRef<HTMLButtonElement | null>(null);

    const mainEl = useRef<HTMLElement | null>(null);

    const pathname = usePathname();
    const isHomepage = pathname === '/';

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'ArrowUp') {
            e.stopPropagation();
            hideDropdown();
            categoriesButtonRef.current?.focus();
        }
    };

    const handleKeyDownOnButton = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.stopPropagation();
            expandDropdown();
        }
    };

    const toggleDropdown = () => {
        setIsExpanded(prev => !prev);
    };

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

    const ctx = {
        categories,
        isExpanded,
        isScrolled,
        setIsExpanded,
        hideDropdown,
    };

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
                                ref={categoriesButtonRef}
                                onClick={toggleDropdown}
                                type={'button'}
                                className={cn(styles.categoriesButton, 'button-empty')}
                                aria-expanded={isExpanded}
                                aria-controls={'categories-dropdown'}
                                id={'categories-button'}
                                onKeyDown={handleKeyDownOnButton}
                            >
                                {'Categories'}
                            </button>
                        </div>
                    )}

                    {!isDesktop && <MobileNavigation />}
                </nav>
                {isDesktop && <CategoriesDropdown controllerBtnRef={categoriesButtonRef} isExpanded={isExpanded} categories={categories} />}
            </header>
            <Overlay open={isExpanded} onClose={hideDropdown} zIndex={2} />
        </NavigationContext.Provider>
    );
};

export default Navigation;
