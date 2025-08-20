'use client';

import React, { createContext, PropsWithChildren } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_SORT_ORDER, SEARCH_PARAMS_KEYS } from '@/constants';
import { mergeClasses } from '@/utils/mergeClasses';
import styles from './filterActions.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';

type RootProps = {
	sort?: string;
	selectedParamIds: string[];
	defaultSort?: string; // default: DEFAULT_SORT_ORDER
	className?: string; // footer wrapper classes
};

type Ctx = {
	onApply: () => void;
	onReset: () => void;
};

const FilterActionsCtx = createContext<Ctx | null>(null);

function Root({
	children,
	sort,
	selectedParamIds,
	defaultSort = DEFAULT_SORT_ORDER,
	className,
}: PropsWithChildren<RootProps>) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const replaceParams = (next: URLSearchParams) => {
		next.delete('page');
		router.replace(`${pathname}?${next.toString()}`, { scroll: false });
	};

	const onApply = () => {
		const next = new URLSearchParams(searchParams.toString());

		if (sort && sort !== defaultSort) next.set('sort', sort);
		else next.delete('sort');

		if (selectedParamIds.length) next.set('params', selectedParamIds.join(','));
		else next.delete('params');

		replaceParams(next);
	};

	const onReset = () => {
		const next = new URLSearchParams(searchParams.toString());
		SEARCH_PARAMS_KEYS.forEach((k) => next.delete(k));
		replaceParams(next);
	};

	return (
		<FilterActionsCtx.Provider value={{ onApply, onReset }}>
			<footer className={mergeClasses(styles.container, 'flex', 'align-center', className)}>{children}</footer>
		</FilterActionsCtx.Provider>
	);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

function Reset({ children = 'Reset', className, onClick = (e) => {}, ...rest }: ButtonProps) {
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

function Apply({ children = 'Show results', className, onClick = (e) => {}, ...rest }: ButtonProps) {
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
