'use client';

import React from 'react';
import styles from './navigation.module.scss';
import Hamburger from '../icons/Hamburger';
import Menu from './Menu';
import useOpenState from '@/hooks/useIsOpenState';
import { mergeClasses } from '@/utils/mergeClasses';

const MobileNavigation = () => {
	const { isOpen, close, open } = useOpenState();

	return (
		<>
			<Menu isOpen={isOpen} close={close} />
			<button className={mergeClasses(styles.button, 'button-empty', styles.hamburgerBtn)} onClick={open}>
				<Hamburger />
			</button>
		</>
	);
};

export default MobileNavigation;
