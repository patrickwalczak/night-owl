import { type SetStateAction, type Dispatch } from 'react';

import { SORT_OPTIONS } from '@/pages/categorySlug/config/searchParams';
import { type SortOrderType } from '@/pages/categorySlug/model/searchParams.types';
import { cn } from '@/shared/lib/utils/cn';

import { createRadioGroup } from '../../../../../../../shared/ui/radioGroup/RadioGroup';
import styles from './sortOrderSelector.module.scss';

const SortOrderSelector = ({
    sort,
    setSort,
}: {
    sort: SortOrderType;
    setSort: Dispatch<SetStateAction<SortOrderType>>;
}) => {
    const RadioGroup = createRadioGroup<SortOrderType>();

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
                {SORT_OPTIONS.map(option => (
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
