'use client';

import type React from 'react';

import { type PropsWithChildren } from 'react';
import { createContext } from 'react';

import { DEFAULT_SORT_ORDER } from '@/constants';
import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils/cn';

import { CatalogUrlActionsContext } from '../../../../../../model/providers/CatalogUrlActionsProvider';
import styles from './filterActions.module.scss';

interface RootProps {
    sort?: string;
    selectedParamIds: string[];
    defaultSort?: string;
    className?: string;
}

interface ActionsContextType {
    onApply: () => void;
    onReset: () => void;
}

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

    const onReset = () => reset(sort ? [] : ['sort']);

    return (
        <FilterActionsCtx.Provider value={{ onApply, onReset }}>
            <div className={cn(styles.container, 'flex', 'align-center', className)}>{children}</div>
        </FilterActionsCtx.Provider>
    );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

function Reset({ children = 'Reset', className, onClick = () => {}, ...rest }: ButtonProps) {
    const { onReset } = useSafeContext(FilterActionsCtx);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onReset();
        onClick(e);
    };

    return (
        <button
            type={'button'}
            className={cn(styles.resetBtn, styles.filterBtn, className)}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </button>
    );
}

function Apply({ children = 'Show results', className, onClick = () => {}, ...rest }: ButtonProps) {
    const { onApply } = useSafeContext(FilterActionsCtx);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onApply();
        onClick(e);
    };

    return (
        <button type={'button'} className={cn(styles.showBtn, styles.filterBtn, className)} onClick={handleClick} {...rest}>
            {children}
        </button>
    );
}

const FilterActions = {
    Root,
    Reset,
    Apply,
};

export default FilterActions;
