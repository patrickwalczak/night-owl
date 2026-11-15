'use client';

import { type ChangeEvent } from 'react';

import { Accordion } from '@/shared/ui/accordion/client';
import { Checkbox } from '@/shared/ui/checkbox/client';

import { type CategoryParameter } from '../../../../model/categoryPage.types';
import { useCategoryPageContext } from '../../../../model/categoryPageContext';
import styles from './parameterBox.module.scss';

const checkboxClasses = { label: styles.checkboxLabel };

export const ParameterBox = ({ parameter }: { parameter: CategoryParameter }) => {
    const { setFilterValue, selectedFilters } = useCategoryPageContext();
    const selectedValues = selectedFilters[parameter.slug];

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.currentTarget;

        setFilterValue({
            parameterSlug: parameter.slug,
            parameterValueSlug: value,
            checked,
        });
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
