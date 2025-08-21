'use client';

import React from 'react';
import styles from './navigation.module.scss';
import Hamburger from '../../icons/Hamburger';
import Menu from './Menu';
import useOpenState from '@/hooks/useIsOpenState';
import { mergeClasses } from '@/utils/mergeClasses';
import { useSafeContext } from '@/hooks/useSafeContext';
import { NavigationContext } from '@/components/navigation/Navigation';

const MobileNavigation = () => {
	const { isScrolled, hideDropdown } = useSafeContext(NavigationContext);
	const { isOpened: isMenuOpened, close: closeMenu, open: openMenu } = useOpenState();

	const handleCloseMenu = () => {
		closeMenu();
		hideDropdown();
	};

	return (
		<>
			<Menu isMenuOpened={isMenuOpened} closeMenu={handleCloseMenu} />
			<button
				type="button"
				aria-label="Open menu"
				aria-expanded={isMenuOpened}
				aria-controls="mobile-menu"
				aria-haspopup="true"
				className={mergeClasses(
					styles.button,
					'button-empty',
					styles.hamburgerBtn,
					isScrolled && styles.isScrolled,
					'transition-200'
				)}
				onClick={openMenu}
			>
				<Hamburger />
			</button>
		</>
	);
};

export default MobileNavigation;
