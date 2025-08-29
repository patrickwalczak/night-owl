'use client';

import React, { createContext, PropsWithChildren } from 'react';
import { DEFAULT_SORT_ORDER } from '@/constants';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './filterActions.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';
import { CatalogUrlActionsContext } from '../../../providers/CatalogUrlActionsProvider';

type RootProps = {
	sort?: string;
	selectedParamIds: string[];
	defaultSort?: string;
	className?: string;
};

type ActionsContextType = {
	onApply: () => void;
	onReset: () => void;
};

const FilterActionsCtx = createContext<ActionsContextType | null>(null);

function Root({
	children,
	sort,
	selectedParamIds,
	defaultSort = DEFAULT_SORT_ORDER,
	className,
}: PropsWithChildren<RootProps>) {
	const { applyFilters, reset } = useSafeContext(CatalogUrlActionsContext);

	const onApply = () => {
		applyFilters({
			sort: sort && sort !== defaultSort ? sort : null,
			ids: selectedParamIds,
		});
	};

	const onReset = () => reset();

	return (
		<FilterActionsCtx.Provider value={{ onApply, onReset }}>
			<footer className={mergeClasses(styles.container, 'flex', 'align-center', className)}>{children}</footer>
		</FilterActionsCtx.Provider>
	);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

function Reset({ children = 'Reset', className, onClick = () => {}, ...rest }: ButtonProps) {
	const { onReset } = useSafeContext(FilterActionsCtx);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		onReset();
		onClick(e);
	};

	return (
		<button
			type="button"
			className={mergeClasses(styles.resetBtn, styles.filterBtn, className)}
			onClick={handleClick}
			{...rest}
		>
			{children}
		</button>
	);
}

function Apply({ children = 'Show results', className, onClick = () => {}, ...rest }: ButtonProps) {
	const { onApply } = useSafeContext(FilterActionsCtx);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		onApply();
		onClick(e);
	};

	return (
		<button
			type="button"
			className={mergeClasses(styles.showBtn, styles.filterBtn, className)}
			onClick={handleClick}
			{...rest}
		>
			{children}
		</button>
	);
}

const FilterActions = Object.assign(Root, { Reset, Apply });
export default FilterActions;
