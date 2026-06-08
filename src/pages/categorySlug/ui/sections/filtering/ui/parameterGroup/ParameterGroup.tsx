import { type Dispatch, type SetStateAction } from 'react';

import { Checkbox } from '@/shared/ui/checkboxGroup/Checkbox';
import { type FilterParameterType } from '@/types/parameter.model';
import { mergeClasses } from '@/shared/lib/utils/mergeClasses';

import styles from './parameterGroup.module.scss';

interface ParameterGroupType {
	parameter: FilterParameterType;
	selectedParamIds: string[];
	setSelectedParamIds: Dispatch<SetStateAction<string[]>>;
}

const ParameterGroup = ({ parameter, selectedParamIds, setSelectedParamIds }: ParameterGroupType) => {
	if (!parameter?.values?.length) return null;

	return (
		<Checkbox.Root
			values={selectedParamIds}
			onValuesChange={setSelectedParamIds}
			name={`parameter-${parameter.id}`}
			className={styles.fieldset}
		>
			<Checkbox.Legend className={mergeClasses(styles.legend, 'truncate')}>{parameter.name}</Checkbox.Legend>
			<Checkbox.List className={mergeClasses(styles.list, 'flex', 'flex-col')}>
				{parameter.values.map((v) => (
					<Checkbox.ListElement key={v.id}>
						<Checkbox.Option
							labelClassName={mergeClasses(styles.label, 'truncate')}
							inputClassName={mergeClasses(styles.input, 'sr-only')}
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
