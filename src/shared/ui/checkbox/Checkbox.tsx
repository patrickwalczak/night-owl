'use client';

import { useId } from 'react';

import { cn } from '@/shared/lib/utils';

import type { ContainerType, InputType, LabelType, DefaultCheckboxType } from './types';

import styles from './checkbox.module.scss';

const Container = ({ children, className, ...props }: ContainerType) => {
    return (
        <div className={cn(styles.container, className)} {...props}>
            {children}
        </div>
    );
};

const Input = (props: InputType) => {
    return (
        <input className={cn(styles.input, props.className)} type={'checkbox'} {...props} />
    );
};

const Label = (props: LabelType) => {
    return (
        <label className={cn(styles.label, props.className)} {...props}>{props.children}</label>
    );
};

export const CustomCheckbox = {
    Container,
    Input,
    Label,
};

export const Checkbox = ({ label, name, value, classNames, id: providedId, onChange }: DefaultCheckboxType) => {
    const generatedId = useId();
    const id = providedId ?? generatedId;

    return (
        <CustomCheckbox.Container className={classNames?.container}>
            <CustomCheckbox.Input className={classNames?.input} name={name} value={value} id={id} onChange={onChange} />
            <CustomCheckbox.Label className={classNames?.label} htmlFor={id}>{label}</CustomCheckbox.Label>
        </CustomCheckbox.Container>
    );
};

// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox
// https://dev.to/adbutterfield/custom-styling-radio-buttons-the-modern-way-the-butterfield-way-emk#side-quest-a-brief-history-of-the-appearance-property
// https://dev.to/adbutterfield/custom-styling-checkboxes-the-modern-way-3o42
