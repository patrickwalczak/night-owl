import { type ChangeEvent } from 'react';

import { Accordion } from '@/shared/ui/accordion/Accordion';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

import { type CategoryParameter } from '../../../../category/model/categoryPage.types';
import { setFilterValue } from '../../../../category/model/store/categoryListingSlice';
import { useCategoryPageDispatch, useCategoryPageSelector } from '../../../../category/model/store/client';
import styles from './parameterBox.module.scss';

const checkboxClasses = { label: styles.checkboxLabel };

export const ParameterBox = ({ parameter }: { parameter: CategoryParameter }) => {
    const dispatch = useCategoryPageDispatch();
    const selectedValues = useCategoryPageSelector(state => state.categoryListing.selectedFilters[parameter.slug]);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.currentTarget;

        dispatch(setFilterValue({
            parameterSlug: parameter.slug,
            parameterValueSlug: value,
            checked,
        }));
    };

    return (
        <Accordion.Root className={styles.accordion}>
            <Accordion.Header headingText={parameter.name} className={styles.accordionHeader} />
            <Accordion.Panel className={styles.panel}>
                {parameter.values.map(paramValue => (
                    <Checkbox
                        classNames={checkboxClasses}
                        key={paramValue.id}
                        label={paramValue.value}
                        value={paramValue.slug}
                        checked={selectedValues?.includes(paramValue.slug) ?? false}
                        onChange={onChange}
                    />
                ))}
            </Accordion.Panel>
        </Accordion.Root>
    );
};
