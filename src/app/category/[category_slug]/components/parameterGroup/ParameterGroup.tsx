import React from 'react';
import styles from './parameterGroup.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { FilterParameterType } from '@/types/parameter.model';
import { createCheckboxGroup } from '../checkboxGroup/CheckboxGroup';

const ParameterGroup = ({
	parameter,
	selectedParamIds,
	setSelectedParamIds,
}: {
	parameter: FilterParameterType;
	selectedParamIds: string[];
	setSelectedParamIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	if (!parameter?.values?.length) return null;

	const CheckboxGroup = createCheckboxGroup<string>();

	return (
		<CheckboxGroup.Root
			values={selectedParamIds}
			onValuesChange={setSelectedParamIds}
			name={`parameter-${parameter.id}`}
			className={styles.fieldset}
		>
			<CheckboxGroup.Legend className={mergeClasses(styles.legend, 'truncate')}>{parameter.name}</CheckboxGroup.Legend>
			<CheckboxGroup.List className={mergeClasses(styles.list, 'flex', 'flex-col')}>
				{parameter.values.map((v) => (
					<CheckboxGroup.Option
						labelClassName={mergeClasses(styles.label, 'truncate')}
						inputClassName={mergeClasses(styles.input, 'sr-only')}
						customCheckboxClassName={styles.customCheckbox}
						labelTextClassName={styles.customCheckboxValue}
						key={v.id}
						value={v.id}
						label={v.value}
						id={`parameter-${parameter.id}-${v.id}`}
					/>
				))}
			</CheckboxGroup.List>
		</CheckboxGroup.Root>
	);
};

export default ParameterGroup;
