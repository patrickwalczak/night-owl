'use client';

import { createContext, type MouseEvent, useCallback, useId, useState } from 'react';

import { useSafeContext } from '@/shared/lib/hooks/useSafeContext';
import { cn } from '@/shared/lib/utils';
import { ArrowDownIcon } from '@/shared/ui/icons';

import type {
    AccordionButtonType,
    AccordionContextValue,
    AccordionHeaderType,
    AccordionPanelType,
    AccordionRootType,
} from './types';

import styles from './accordion.module.scss';

const AccordionContext = createContext<AccordionContextValue | null>(null);

const AccordionRoot = ({
    children,
    className,
    defaultExpanded = false,
    onExpandedChange,
    disabled = false,
    ...props
}: AccordionRootType) => {
    const id = useId();
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const panelId = `accordion-panel-${id}`;
    const buttonId = `accordion-button-${id}`;

    const toggle = useCallback(() => {
        if (disabled) {
            return;
        }

        const nextIsExpanded = !isExpanded;

        setIsExpanded(nextIsExpanded);

        onExpandedChange?.(nextIsExpanded);
    }, [disabled, isExpanded, onExpandedChange]);

    return (
        <AccordionContext.Provider value={{ isExpanded, disabled, panelId, buttonId, toggle }}>
            <div {...props} className={cn(styles.root, className)}>{children}</div>
        </AccordionContext.Provider>
    );
};

const AccordionPanel = ({ children, className, ...props }: AccordionPanelType) => {
    const { panelId, buttonId, isExpanded } = useSafeContext(AccordionContext);

    return (
        <div
            {...props}
            hidden={!isExpanded}
            className={cn(styles.panel, className)}
            role={'region'}
            id={panelId}
            aria-labelledby={buttonId}
        >
            {children}
        </div>
    );
};

const AccordionHeader = ({
    headingText,
    headingLevel = 3,
    className,
    onClick,
    buttonProps,
    ...props
}: AccordionHeaderType) => {
    const Heading = `h${headingLevel}` as const;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        buttonProps?.onClick?.(event);
    };

    return (
        <Heading {...props} className={cn(styles.header, className)}>
            <AccordionButton {...buttonProps} onClick={handleClick}>
                {headingText}
            </AccordionButton>
        </Heading>
    );
};

const AccordionButton = ({ onClick, disabled, ...props }: AccordionButtonType) => {
    const { isExpanded, disabled: rootDisabled, panelId, buttonId, toggle } = useSafeContext(AccordionContext);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
            toggle();
        }
    };

    return (
        <button
            {...props}
            className={cn(styles.button, props.className)}
            id={buttonId}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            disabled={rootDisabled || disabled}
            onClick={handleClick}
            type={'button'}
        >
            {props.children}
            <span className={styles.iconContainer}>
                <ArrowDownIcon aria-hidden className={cn(styles.icon, { [styles.isExpanded]: isExpanded })} />
            </span>
        </button>
    );
};

export const Accordion = {
    Root: AccordionRoot,
    Panel: AccordionPanel,
    Header: AccordionHeader,
};
