'use client';

import './utils.scss';
import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useMemo, useRef } from 'react';

import { openCart } from '@/lib/store/features/order/orderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { type CartItem } from '@/types/cartItem';
import { type SimpleCategoryModelType } from '@/types/category.model';
import { mergeClasses } from '@/shared/lib/utils/mergeClasses';

import Cart from '../../../shared/ui/icons/Cart';
import CartDrawer from '../../cartDrawer/CartDrawer';
import useIsDropdownExpanded from '../hooks/useIsDropdownExpanded';
import useIsScrolled from '../hooks/useIsScrolled';
import Overlay from './components/Overlay';
import CategoriesDropdown from './desktop/categoriesDropdown/CategoriesDropdown';
import MobileNavigation from './mobile/MobileNavigation';
import styles from './navigation.module.scss';

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
	const items = useAppSelector((state) => state.order.items);
	const dispatch = useAppDispatch();

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

	const openCartDrawer = () => dispatch(openCart());

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
			setIsExpanded((prev) => !prev);
			// Arrow down expands dropdown
		} else if (e.key === 'ArrowDown') {
			e.stopPropagation();
			expandDropdown();
		}
	};

	// Keep the main content inactive while the navigation overlay is open
	// so users cannot click or focus elements behind it.
	useEffect(() => {
		mainEl.current = document.querySelector('main');

		if (mainEl.current && isExpanded) {
			mainEl.current.setAttribute('inert', String(isExpanded));
		} else if (mainEl.current) {
			mainEl.current.removeAttribute('inert');
		}

		return () => mainEl.current?.removeAttribute('inert');
	}, [isExpanded]);

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
				<nav className={mergeClasses(styles.nav, 'transition-200')} aria-label={'Main navigation'}>
					<Link className={mergeClasses(styles.logoLink)} href={'/'}>
						<span className={mergeClasses(styles.logo, 'transition-200')}>{'Night Owl'}</span>
					</Link>

					{isDesktop && (
						<div className={mergeClasses(styles.listWrapper, 'flex', 'align-center')}>
							<button
								ref={catalogBtnRef}
								onPointerEnter={expandDropdown}
								type={'button'}
								className={mergeClasses(styles.catalogButton, 'button-empty')}
								aria-haspopup={'true'}
								aria-expanded={isExpanded}
								aria-controls={'catalog-dropdown'}
								id={'catalog-button'}
								onKeyDown={handleKeyDownOnButton}
							>
								{'Catalog'}
							</button>
							<button
								onClick={openCartDrawer}
								type={'button'}
								className={mergeClasses(styles.cartButton, 'button-empty')}
								aria-label={'Open cart'}
								data-cart-icon
							>
								<Cart />
								<CartBadgeInline items={items} />
							</button>
						</div>
					)}

					{!isDesktop && <MobileNavigation />}
				</nav>
				<CategoriesDropdown controllerBtnRef={catalogBtnRef} isExpanded={isExpanded} categories={categories} />
				<CartDrawer />
			</header>
			<Overlay open={isExpanded} onClose={hideDropdown} zIndex={2} />
		</NavigationContext.Provider>
	);
};

export default Navigation;

function CartBadgeInline({ items }: { items: CartItem[] }) {
	const ref = useRef<HTMLSpanElement>(null);
	const countTotal = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);

	useEffect(() => {
		if (!ref.current || items.length <= 0) return;

		ref.current.classList.remove(styles.bump);
		ref.current.offsetWidth;
		ref.current.classList.add(styles.bump);
	}, [items]);

	if (items.length <= 0) return null;

	const display = countTotal > 99 ? '99+' : String(countTotal);

	return (
		<span ref={ref} className={styles.badge} aria-live={'polite'} aria-atomic={'true'}>
			{display}
		</span>
	);
}
