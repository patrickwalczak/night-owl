import React, { type SetStateAction, type Dispatch } from 'react';

import { SORT_OPTIONS } from '@/constants';
import { type SortOrderKeys } from '@/types/catalog.models';
import { mergeClasses } from '@/shared/lib/utils/mergeClasses';

import { createRadioGroup } from '../../../../../../../shared/ui/radioGroup/RadioGroup';
import styles from './sortOrderSelector.module.scss';

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
			name={'sort'}
			ariaLabel={'Sort by'}
			className={styles.sortGroup}
		>
			<RadioGroup.Legend className={styles.sortLegend}>{'Sort by'}</RadioGroup.Legend>
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
