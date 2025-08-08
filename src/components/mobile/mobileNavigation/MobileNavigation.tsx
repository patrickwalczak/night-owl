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
	const { isScrolled } = useSafeContext(NavigationContext);
	const { isOpen, close, open } = useOpenState();

	return (
		<>
			<Menu isOpen={isOpen} close={close} />
			<button
				type="button"
				aria-label="Open menu"
				aria-expanded={isOpen}
				aria-controls="mobile-menu"
				aria-haspopup="true"
				className={mergeClasses(
					styles.button,
					'button-empty',
					styles.hamburgerBtn,
					isScrolled && styles.isScrolled,
					'transition-200'
				)}
				onClick={open}
			>
				<Hamburger />
			</button>
		</>
	);
};

export default MobileNavigation;
