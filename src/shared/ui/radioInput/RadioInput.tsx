'use client';

import { useId } from 'react';

import { cn } from '@/shared/lib/utils';

import styles from './radioInput.module.scss';
import { type InputType, type LabelType, type RadioInputType } from './types';

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
        <div className={cn(styles.container, classNames?.wrapper, testClassNames?.wrapper)}>
            <Input
                value={value}
                id={id}
                className={cn(classNames?.input, testClassNames?.input)}
                {...props}
            />
            <Label
                htmlFor={id}
                className={cn(classNames?.label, testClassNames?.label)}
            >
                {label}
            </Label>
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
