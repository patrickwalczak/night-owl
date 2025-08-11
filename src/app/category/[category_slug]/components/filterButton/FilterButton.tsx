import Filters from '@/components/icons/Filters';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './filterButton.module.scss';
import React from 'react';

const FilterButton = ({ label, handleClick }: { label: string; handleClick: () => void }) => {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={mergeClasses('flex', 'align-center', 'button-empty', styles.btn)}
		>
			{label}
			<Filters />
		</button>
	);
};

export default FilterButton;
