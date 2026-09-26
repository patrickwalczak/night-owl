import type { ComponentPropsWithRef, ReactNode } from 'react';

type DataAttributesType = Record<`data-${string}`, string | number | boolean | undefined>;

interface AccordionControlledStateType {
    isExpanded: boolean;
    defaultExpanded?: never;
    onExpandedChange: (isExpanded: boolean) => void;
}

interface AccordionUncontrolledStateType {
    isExpanded?: never;
    defaultExpanded?: boolean;
    onExpandedChange?: (isExpanded: boolean) => void;
}

export interface AccordionContextValue {
    isExpanded: boolean;
    disabled: boolean;
    panelId: string;
    buttonId: string;
    toggle: () => void;
}

export type AccordionRootType = Omit<ComponentPropsWithRef<'div'>, 'children' | 'dangerouslySetInnerHTML'>
    & DataAttributesType
    & (AccordionControlledStateType | AccordionUncontrolledStateType)
    & {
        children: ReactNode;
        disabled?: boolean;
        dangerouslySetInnerHTML?: never;
    };

export interface AccordionPanelType extends Omit<
    ComponentPropsWithRef<'div'>,
    'id' | 'role' | 'hidden' | 'aria-labelledby' | 'aria-label' | 'aria-hidden' | 'dangerouslySetInnerHTML'
>, DataAttributesType {
    'children': ReactNode;
    'id'?: never;
    'role'?: never;
    'hidden'?: never;
    'aria-labelledby'?: never;
    'aria-label'?: never;
    'aria-hidden'?: never;
    'dangerouslySetInnerHTML'?: never;
}

export interface AccordionHeaderType extends Omit<
    ComponentPropsWithRef<'h3'>,
    'children' | 'onClick' | 'role' | 'aria-level' | 'dangerouslySetInnerHTML'
>, DataAttributesType {
    'headingText': ReactNode;
    'headingLevel'?: 1 | 2 | 3 | 4 | 5 | 6;
    'buttonProps'?: Omit<AccordionButtonType, 'children'> & { children?: never };
    'onClick'?: AccordionButtonType['onClick'];
    'children'?: never;
    'role'?: never;
    'aria-level'?: never;
    'dangerouslySetInnerHTML'?: never;
}

export interface AccordionButtonType extends Omit<
    ComponentPropsWithRef<'button'>,
    'id' | 'type' | 'aria-expanded' | 'aria-controls' | 'aria-label' | 'aria-hidden' | 'dangerouslySetInnerHTML'
>, DataAttributesType {
    'children': ReactNode;
    'type'?: 'button';
    'id'?: never;
    'aria-expanded'?: never;
    'aria-controls'?: never;
    'aria-label'?: never;
    'aria-hidden'?: never;
    'dangerouslySetInnerHTML'?: never;
}
