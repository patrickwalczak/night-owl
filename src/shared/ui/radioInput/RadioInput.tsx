'use client';

import { useId } from 'react';

import { cn } from '@/shared/lib/utils';

import styles from './radioInput.module.scss';
import { type ContainerType, type InputType, type LabelType, type RadioInputType } from './types';

const Container = ({ children, className, ...props }: ContainerType) => {
    return (
        <div {...props} className={cn(styles.container, className)}>
            {children}
        </div>
    );
};

const Label = ({ children, className, ...props }: LabelType) => {
    return (
        <label
            className={cn(styles.label, className)}
            {...props}
        >
            {children}
        </label>
    );
};

const Input = ({ className, ...props }: InputType) => {
    return (
        <input
            className={cn(styles.input, className)}
            {...props}
            type={'radio'}
        />
    );
};

export const CustomRadioInput = {
    Container,
    Input,
    Label,
};

export const RadioInput = ({
    classNames,
    label,
    testClassNames,
    id: providedId,
    value,
    ...props
}: RadioInputType) => {
    const generatedId = useId();
    const id = providedId ?? generatedId;

    return (
        <CustomRadioInput.Container className={cn(classNames?.wrapper, testClassNames?.wrapper)}>
            <CustomRadioInput.Input
                className={cn(classNames?.input, testClassNames?.input)}
                id={id}
                value={value}
                {...props}
            />
            <CustomRadioInput.Label
                className={cn(classNames?.label, testClassNames?.label)}
                htmlFor={id}
            >
                {label}
            </CustomRadioInput.Label>
        </CustomRadioInput.Container>
    );
};
