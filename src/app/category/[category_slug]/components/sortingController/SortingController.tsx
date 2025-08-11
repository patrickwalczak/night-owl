import React from 'react';
import styles from './sortingController.module.scss';
import ArrowDown from '@/components/icons/ArrowDown';

const SortingController = () => {
	return (
		<button className={styles.sortBtn}>
			Sort By <ArrowDown />
		</button>
	);
};

export default SortingController;
