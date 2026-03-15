import React, { SetStateAction, Dispatch } from 'react';
import styles from './sortOrderSelector.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { SortOrderKeys } from '@/types/catalog.models';
import { createRadioGroup } from '../radioGroup/RadioGroup';
import { SORT_OPTIONS } from '@/constants';

const SortOrderSelector = ({
	sort,
	setSort,
}: {
	sort: SortOrderKeys;
	setSort: Dispatch<SetStateAction<SortOrderKeys>>;
}) => {
	const RadioGroup = createRadioGroup<SortOrderKeys>();

	return (
		<RadioGroup.RadioGroup
			value={sort}
			onValueChange={setSort}
			name="sort"
			ariaLabel="Sort by"
			className={styles.sortGroup}
		>
			<RadioGroup.Legend className={styles.sortLegend}>Sort by</RadioGroup.Legend>
			<RadioGroup.List className={mergeClasses(styles.sortList, 'flex', 'flex-col')}>
				{SORT_OPTIONS.map((option) => (
					<RadioGroup.Option
						key={option.value}
						value={option.value}
						label={option.label}
						labelClassName={styles.sortLabel}
						customRadioClassName={styles.customRadio}
						labelTextClassName={styles.labelText}
					/>
				))}
			</RadioGroup.List>
		</RadioGroup.RadioGroup>
	);
};

export default SortOrderSelector;
