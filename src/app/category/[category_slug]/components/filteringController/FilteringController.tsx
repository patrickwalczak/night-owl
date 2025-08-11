'use client';
import React, { useState } from 'react';
import FilterButton from '../filterButton/FilterButton';

const FilteringController = () => {
	const [label, setlabel] = useState('Show Filters');
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setlabel(isOpen ? 'Hide Filters' : 'Show Filters');
		setIsOpen(!isOpen);
	};

	return (
		<>
			<FilterButton label={label} handleClick={handleClick} />
		</>
	);
};

export default FilteringController;
