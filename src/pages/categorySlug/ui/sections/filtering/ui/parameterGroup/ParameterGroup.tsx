import { cn } from '@/shared/lib/utils/cn';
import { Checkbox } from '@/shared/ui/checkboxGroup/Checkbox';

import styles from './parameterGroup.module.scss';

interface ParameterGroupType {
    parameter: any;
    selectedParamIds: string[];
    setSelectedFilters: (ids: string[]) => void;
}

const ParameterGroup = ({ parameter, selectedParamIds, setSelectedFilters }: ParameterGroupType) => {
    if (!parameter?.values?.length) return null;

    return (
        <Checkbox.Root
            values={selectedParamIds}
            onValuesChange={setSelectedFilters}
            name={`parameter-${parameter.id}`}
            className={styles.fieldset}
        >
            <Checkbox.Legend className={cn(styles.legend, 'truncate')}>{parameter.name}</Checkbox.Legend>
            <Checkbox.List className={cn(styles.list, 'flex', 'flex-col')}>
                {parameter.values.map(v => (
                    <Checkbox.ListElement key={v.id}>
                        <Checkbox.Option
                            labelClassName={cn(styles.label, 'truncate')}
                            inputClassName={cn(styles.input, 'sr-only')}
                            customCheckboxClassName={styles.customCheckbox}
                            value={v.id}
                            count={v._count.products || 0}
                            label={v.value}
                            id={`parameter-${parameter.id}-${v.id}`}
                        />
                    </Checkbox.ListElement>
                ))}
            </Checkbox.List>
        </Checkbox.Root>
    );
};

export default ParameterGroup;
