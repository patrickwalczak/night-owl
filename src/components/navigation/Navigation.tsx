'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './navigation.module.scss';
import Cart from '../icons/Cart';
import MobileNavigation from '../mobileNavigation/MobileNavigation';
import { mergeClasses } from '@/utils/mergeClasses';
import NavDropdown from '../navDropdown/NavDropdown';
import './utils.scss';
import { SimpleCategoryModelType } from '@/types/category.model';
import { usePathname } from 'next/navigation';

const Navigation = ({ categories }: { categories: SimpleCategoryModelType[] }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const pathname = usePathname();
	const isHome = pathname === '/';

	const handleMouseEnter = () => {
		setIsExpanded(true);
	};

	const handleMouseLeave = () => {
		setIsExpanded(false);
	};

	return (
		<header className={mergeClasses(styles.header, isHome && styles.isTransparent)} onMouseLeave={handleMouseLeave}>
			<nav className={mergeClasses(styles.nav)} aria-label="Main navigation">
				<Link className={styles.logoLink} href="/" aria-label="Go to homepage">
					<span className={styles.logo}>Night Owl</span>
				</Link>

				<div className={mergeClasses(styles.listWrapper, 'flex', 'align-center')}>
					<button
						onMouseEnter={handleMouseEnter}
						type="button"
						className={mergeClasses(styles.catalogButton, 'button-empty', 'nav-hover-underline')}
					>
						Catalog
					</button>
					<button type="button" className={mergeClasses(styles.cartButton, 'button-empty')} aria-label="Open cart">
						<Cart />
					</button>
				</div>

				<MobileNavigation />
			</nav>
			<NavDropdown isExpanded={isExpanded} categories={categories} />
		</header>
	);
};

export default Navigation;
