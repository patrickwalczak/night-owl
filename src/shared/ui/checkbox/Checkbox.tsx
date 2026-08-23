'use client';

import { useId } from 'react';

import { cn } from '@/shared/lib/utils';

import type { ContainerType, InputType, LabelType, DefaultCheckboxType } from './types';

import styles from './checkbox.module.scss';

const Container = ({ children, className, ...props }: ContainerType) => {
    return (
        <div {...props} className={cn(styles.container, className)}>
            {children}
        </div>
    );
};

const Input = (props: InputType) => {
    return (
        <input {...props} className={cn(styles.input, props.className)} type={'checkbox'} />
    );
};

const Label = (props: LabelType) => {
    return (
        <label {...props} className={cn(styles.label, props.className)}>{props.children}</label>
    );
};

export const CustomCheckbox = {
    Container,
    Input,
    Label,
};

export const Checkbox = ({
    label,
    classNames,
    id: providedId,
    ...inputProps
}: DefaultCheckboxType) => {
    const generatedId = useId();
    const id = providedId ?? generatedId;

    return (
        <CustomCheckbox.Container className={classNames?.container}>
            <CustomCheckbox.Input
                className={classNames?.input}
                id={id}
                {...inputProps}
            />
            <CustomCheckbox.Label className={classNames?.label} htmlFor={id}>{label}</CustomCheckbox.Label>
        </CustomCheckbox.Container>
    );
};
