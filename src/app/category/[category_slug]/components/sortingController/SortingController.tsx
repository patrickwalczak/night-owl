import React from 'react';
import styles from './sortingController.module.scss';
import SortingIcon from '../../../../../../public/icons/arrow_down.svg';

const SortingController = () => {
	return (
		<button className={styles.sortBtn}>
			Sort By <SortingIcon />
		</button>
	);
};

export default SortingController;
