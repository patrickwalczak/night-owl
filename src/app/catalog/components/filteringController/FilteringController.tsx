'use client';
import React, { useState } from 'react';
import FiltersIcon from '../../../../../public/icons/filters.svg';
import styles from './filteringController.module.scss';

const FilteringController = () => {
	const [label, setlabel] = useState('Show Filters');
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setlabel(isOpen ? 'Show Filters' : 'Show Filters');
		setIsOpen(!isOpen);
	};

	return (
		<button onClick={handleClick} className={styles.filterBtn}>
			Show Filters <FiltersIcon />
		</button>
	);
};

export default FilteringController;
