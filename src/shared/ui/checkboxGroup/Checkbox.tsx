'use client';

import { createContext, type Dispatch, type ReactNode, type SetStateAction, useCallback, useId, useMemo } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { mergeClasses } from '@/shared/lib/utils/mergeClasses';

import styles from './checkboxGroup.module.scss';

export type CheckboxGroupValueType = string;

export interface CheckboxGroupContextType {
	name: string;
	selected: ReadonlySet<CheckboxGroupValueType>;
	toggle: (value: CheckboxGroupValueType) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);

export interface CheckboxGroupRootType<T extends CheckboxGroupValueType = CheckboxGroupValueType> {
	values: T[];
	onValuesChange: Dispatch<SetStateAction<T[]>>;
	name: string;
	ariaLabel?: string;
	className?: string;
	children: ReactNode;
}

export interface CheckboxGroupLegendType {
	children: ReactNode;
	className?: string;
}

export interface CheckboxGroupListType {
	children: ReactNode;
	className?: string;
}

export interface CheckboxGroupOptionType<T extends CheckboxGroupValueType = CheckboxGroupValueType> {
	value: T;
	label: ReactNode;
	id?: string;
	count?: number;
	labelClassName?: string;
	inputClassName?: string;
	customCheckboxClassName?: string;
	labelTextClassName?: string;
}

const useCheckboxGroupContext = () => {
	return useSafeContext<CheckboxGroupContextType>(CheckboxGroupContext);
};

const CheckboxGroupRoot = <T extends CheckboxGroupValueType = CheckboxGroupValueType>({
	values,
	onValuesChange,
	name,
	ariaLabel,
	className,
	children,
}: CheckboxGroupRootType<T>) => {
	const selected = useMemo(() => new Set<CheckboxGroupValueType>(values), [values]);

	const toggle = useCallback(
		(value: CheckboxGroupValueType) => {
			onValuesChange((previousValues) => {
				const newValues = new Set<CheckboxGroupValueType>(previousValues);

				if (newValues.has(value)) {
					newValues.delete(value);
				} else {
					newValues.add(value);
				}

				return Array.from(newValues) as T[];
			});
		},
		[onValuesChange]
	);

	const checkboxGroupContext: CheckboxGroupContextType = {
		name,
		selected,
		toggle,
	};

	return (
		<CheckboxGroupContext.Provider value={checkboxGroupContext}>
			<fieldset aria-label={ariaLabel} className={mergeClasses(styles.root, className)}>
				{children}
			</fieldset>
		</CheckboxGroupContext.Provider>
	);
};

const CheckboxGroupLegend = ({ children, className }: CheckboxGroupLegendType) => {
	return <legend className={className}>{children}</legend>;
};

const CheckboxGroupList = ({ children, className }: CheckboxGroupListType) => {
	return <ul className={className}>{children}</ul>;
};

const ListElement = ({ children, className }: CheckboxGroupListType) => {
	return <li className={className}>{children}</li>;
};

const CheckboxGroupOption = <T extends CheckboxGroupValueType = CheckboxGroupValueType>({
	value,
	label,
	id,
	labelClassName,
	inputClassName,
	customCheckboxClassName,
	labelTextClassName,
	count = 0,
}: CheckboxGroupOptionType<T>) => {
	const checkboxGroupContext = useCheckboxGroupContext();

	const autoId = useId();
	const inputId = id ?? `${checkboxGroupContext.name}-${autoId}`;
	const checked = checkboxGroupContext.selected.has(value);
	const disabled = !checked && count === 0;
	const fullLabel = `${label} (${count})`;

	return (
		<label
			htmlFor={inputId}
			title={fullLabel}
			className={mergeClasses(styles.label, labelClassName, 'flex', 'align-center')}
		>
			<input
				id={inputId}
				type={'checkbox'}
				name={checkboxGroupContext.name}
				value={value}
				checked={checked}
				disabled={disabled}
				onChange={() => checkboxGroupContext.toggle(value)}
				className={mergeClasses('sr-only', styles.input, inputClassName)}
				aria-label={fullLabel}
			/>

			<span
				aria-hidden={'true'}
				className={mergeClasses(styles.customCheckbox, customCheckboxClassName, 'flex-shrink-0')}
			/>

			<span className={styles.textWrap}>
				<span className={mergeClasses(styles.customCheckboxValue, labelTextClassName, 'truncate')}>{label}</span>

				<span className={mergeClasses(styles.count, disabled && styles.countZero)} aria-hidden={'true'}>
					{'('}
					{count.toLocaleString()}
					{')'}
				</span>
			</span>
		</label>
	);
};

export const Checkbox = {
	Root: CheckboxGroupRoot,
	Legend: CheckboxGroupLegend,
	List: CheckboxGroupList,
	ListElement,
	Option: CheckboxGroupOption,
};
