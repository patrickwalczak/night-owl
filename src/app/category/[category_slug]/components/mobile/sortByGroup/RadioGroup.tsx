'use client';
import React, { createContext, useId } from 'react';
import styles from './radioGroup.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';
import { useSafeContext } from '@/hooks/useSafeContext';

type RadioGroupContextType<T extends string> = {
	name: string;
	value: T;
	setValue: (v: T) => void;
};

export function createRadioGroup<T extends string>() {
	const RadioGroupContext = createContext<RadioGroupContextType<T> | null>(null);

	type RadioGroupProps = {
		value: T;
		onValueChange: (next: T) => void;
		name: string;
		ariaLabel?: string;
		className?: string;
		children: React.ReactNode;
	};

	function RadioGroup({ value, onValueChange, name, ariaLabel, className, children }: RadioGroupProps) {
		const ctx: RadioGroupContextType<T> = { name, value, setValue: onValueChange };
		return (
			<RadioGroupContext.Provider value={ctx}>
				<fieldset role="radiogroup" aria-label={ariaLabel} className={mergeClasses(className)}>
					{children}
				</fieldset>
			</RadioGroupContext.Provider>
		);
	}

	function Legend({ children, className }: { children: React.ReactNode; className?: string }) {
		return <legend className={className}>{children}</legend>;
	}

	function List({ children, className }: { children: React.ReactNode; className?: string }) {
		return <ul className={className}>{children}</ul>;
	}

	type OptionProps = {
		value: T;
		label: string;
		labelClassName?: string;
		customRadioClassName?: string;
		labelTextClassName?: string;
	};

	function Option({ value, label, labelClassName, customRadioClassName, labelTextClassName }: OptionProps) {
		const { name, value: selected, setValue } = useSafeContext<RadioGroupContextType<T>>(RadioGroupContext);
		const id = useId();
		return (
			<li>
				<label htmlFor={id} className={mergeClasses(styles.sortLabel, labelClassName)}>
					<input
						id={id}
						type="radio"
						name={name}
						value={value}
						checked={selected === value}
						onChange={() => setValue(value)}
						className={mergeClasses('sr-only', styles.radioInput)}
					/>
					<span aria-hidden className={mergeClasses(styles.customRadio, customRadioClassName)} />
					<span className={mergeClasses(labelTextClassName)}>{label}</span>
				</label>
			</li>
		);
	}

	return { RadioGroup, Legend, List, Option };
}
