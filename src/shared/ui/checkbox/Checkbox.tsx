import { createContext, type ReactNode } from 'react';
import { useSafeContext } from '@/shared/hooks/useSafeContext';
import styles from './checkbox.module.scss';
import { mergeClasses } from '@/utils/mergeClasses';

type CheckboxContextType = {
	id: string; // passed as htmlFor and id (input, label)
	checkedValue: string;
};

const CheckboxContext = createContext<CheckboxContextType | null>(null);

type RootType = {
	children: ReactNode;
	id: string;
	checkedValue: string;
};

const Root = ({ children, id, checkedValue }: RootType) => {
	return (
		<CheckboxContext.Provider value={{ id, checkedValue }}>
			<div className={styles.container}>{children}</div>
		</CheckboxContext.Provider>
	);
};

type InputType = {
	id: string;
	name: string;
	value: string;
	className?: string;
};

const Input = ({ className, ...props }: InputType) => {
	const { checkedValue } = useSafeContext(CheckboxContext);

	return (
		<input
			type="checkbox"
			{...props}
			className={mergeClasses(styles.input, className)}
			checked={props.id === checkedValue}
			onChange={() => {}}
		/>
	);
};

const Label = ({ id, text, className }) => {
	return (
		<label className={mergeClasses(styles.label, className)} htmlFor={id}>
			{text}
		</label>
	);
};

export const Checkbox = {
	Root,
	Input,
	Label,
};

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox
// https://dev.to/adbutterfield/custom-styling-radio-buttons-the-modern-way-the-butterfield-way-emk#side-quest-a-brief-history-of-the-appearance-property
// https://dev.to/adbutterfield/custom-styling-checkboxes-the-modern-way-3o42
