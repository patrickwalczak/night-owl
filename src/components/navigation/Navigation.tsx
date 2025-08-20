'use client';

import './utils.scss';
import Link from 'next/link';
import React, { createContext, useRef } from 'react';
import Cart from '../icons/Cart';
import MobileNavigation from '../mobile/mobileNavigation/MobileNavigation';
import { mergeClasses } from '@/utils/mergeClasses';
import CategoriesDropdown from '../categoriesDropdown/CategoriesDropdown';
import { SimpleCategoryModelType } from '@/types/category.model';
import { usePathname } from 'next/navigation';
import useIsScrolled from './hooks/useIsScrolled';
import useIsDropdownExpanded from './hooks/useIsDropdownExpanded';
import styles from './navigation.module.scss';
import { useAppSelector } from '@/lib/store/hooks';

interface NavigationContextType {
	categories: SimpleCategoryModelType[];
	isExpanded: boolean;
	isScrolled: boolean;
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
	hideDropdown: () => void;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);

const Navigation = ({ categories }: { categories: SimpleCategoryModelType[] }) => {
	const isDesktop = useAppSelector((state) => state.app.isDesktop);

	const { isScrolled, direction } = useIsScrolled();
	const { expandDropdown, hideDropdown, isExpanded, setIsExpanded } = useIsDropdownExpanded();

	const catalogBtnRef = useRef<HTMLButtonElement | null>(null);

	const pathname = usePathname();
	const isHomepage = pathname === '/';

	const ctx = {
		categories,
		isExpanded,
		isScrolled,
		setIsExpanded,
		hideDropdown,
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape' || e.key === 'ArrowUp') {
			e.stopPropagation();
			hideDropdown();
			catalogBtnRef.current?.focus();
		}
	};

	const handleKeyDownOnButton = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === 'ArrowDown') {
			e.stopPropagation();
			setIsExpanded((prev) => !prev);
		}
	};

	return (
		<NavigationContext.Provider value={ctx}>
			<header
				className={mergeClasses(
					styles.header,
					isHomepage && styles.isHomepage,
					isScrolled && styles.isScrolled,
					isExpanded && styles.isDropdownExpanded,
					direction === 'down' && styles.isHidden,
					'transition-200'
				)}
				onPointerLeave={hideDropdown}
				onKeyDown={onKeyDown}
			>
				<nav className={mergeClasses(styles.nav, 'transition-200')} aria-label="Main navigation">
					<Link className={mergeClasses(styles.logoLink)} href="/">
						<span className={mergeClasses(styles.logo, 'transition-200')}>Night Owl</span>
					</Link>

					{isDesktop && (
						<div className={mergeClasses(styles.listWrapper, 'flex', 'align-center')}>
							<button
								ref={catalogBtnRef}
								onPointerEnter={expandDropdown}
								type="button"
								className={mergeClasses(styles.catalogButton, 'button-empty', 'nav-hover-underline', 'transition-200')}
								aria-haspopup="true"
								aria-expanded={isExpanded}
								aria-controls="catalog-dropdown"
								id="catalog-button"
								onKeyDown={handleKeyDownOnButton}
							>
								Catalog
							</button>
							{/* <button type="button" className={mergeClasses(styles.cartButton, 'button-empty')} aria-label="Open cart">
							<Cart />
						</button> */}
						</div>
					)}

					{!isDesktop && <MobileNavigation />}
				</nav>
				<CategoriesDropdown controllerBtnRef={catalogBtnRef} isExpanded={isExpanded} categories={categories} />
			</header>
		</NavigationContext.Provider>
	);
};

export default Navigation;
