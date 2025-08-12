'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useId, useMemo } from 'react';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './checkboxGroup.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';

type Ctx<T extends string> = {
	name: string;
	selected: ReadonlySet<T>;
	toggle: (v: T) => void;
};

export function createCheckboxGroup<T extends string>() {
	const CheckBoxGroupContext = createContext<Ctx<T> | null>(null);

	type RootProps = {
		values: T[];
		onValuesChange: Dispatch<SetStateAction<T[]>>;
		name: string;
		ariaLabel?: string;
		className?: string;
		children: ReactNode;
	};

	function Root({ values, onValuesChange, name, ariaLabel, className, children }: RootProps) {
		const selected = useMemo(() => new Set(values), [values]);

		const toggle = useCallback(
			(v: T) =>
				onValuesChange((prev) => {
					const set = new Set(prev);
					if (set.has(v)) set.delete(v);
					else set.add(v);

					return Array.from(set);
				}),
			[onValuesChange]
		);

		const ctx: Ctx<T> = { name, selected, toggle };

		return (
			<CheckBoxGroupContext.Provider value={ctx}>
				<fieldset aria-label={ariaLabel} className={mergeClasses(className)}>
					{children}
				</fieldset>
			</CheckBoxGroupContext.Provider>
		);
	}

	function Legend({ children, className }: { children: ReactNode; className?: string }) {
		return <legend className={mergeClasses(className)}>{children}</legend>;
	}

	function List({ children, className }: { children: ReactNode; className?: string }) {
		return <ul className={mergeClasses(className)}>{children}</ul>;
	}

	type OptionProps = {
		value: T;
		label: ReactNode;
		id?: string;
		labelClassName?: string;
		inputClassName?: string;
		customCheckboxClassName?: string;
		labelTextClassName?: string;
	};

	function Option({
		value,
		label,
		id,
		labelClassName,
		inputClassName,
		customCheckboxClassName,
		labelTextClassName,
	}: OptionProps) {
		const { name, selected, toggle } = useSafeContext<Ctx<T>>(CheckBoxGroupContext);
		const autoId = useId();
		const inputId = id ?? `${name}-${autoId}`;
		const checked = selected.has(value);

		return (
			<li>
				<label htmlFor={inputId} className={mergeClasses(styles.label, labelClassName, 'flex', 'align-center')}>
					<input
						id={inputId}
						type="checkbox"
						name={name}
						value={value}
						checked={checked}
						onChange={() => toggle(value)}
						className={mergeClasses('sr-only', styles.input, inputClassName)}
					/>
					<span aria-hidden className={mergeClasses(styles.customCheckbox, customCheckboxClassName)} />
					<span className={mergeClasses(styles.customCheckboxValue, labelTextClassName)}>{label}</span>
				</label>
			</li>
		);
	}

	return { Root, Legend, List, Option };
}
