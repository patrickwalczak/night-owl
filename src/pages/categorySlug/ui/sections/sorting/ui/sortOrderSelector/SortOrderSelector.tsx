import { type SetStateAction, type Dispatch } from 'react';

import { CATALOG_SORT_OPTIONS } from '@/constants';
import { type CatalogSortOrderType } from '@/types/catalog.models';
import { cn } from '@/shared/lib/utils/cn';

import { createRadioGroup } from '../../../../../../../shared/ui/radioGroup/RadioGroup';
import styles from './sortOrderSelector.module.scss';

const SortOrderSelector = ({
	sort,
	setSort,
}: {
	sort: CatalogSortOrderType;
	setSort: Dispatch<SetStateAction<CatalogSortOrderType>>;
}) => {
	const RadioGroup = createRadioGroup<CatalogSortOrderType>();

	return (
		<RadioGroup.RadioGroup
			value={sort}
			onValueChange={setSort}
			name={'sort'}
			ariaLabel={'Sort by'}
			className={styles.sortGroup}
		>
			<RadioGroup.Legend className={styles.sortLegend}>{'Sort by'}</RadioGroup.Legend>
			<RadioGroup.List className={cn(styles.sortList, 'flex', 'flex-col')}>
				{CATALOG_SORT_OPTIONS.map((option) => (
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
