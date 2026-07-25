'use client';

import { type ComponentPropsWithRef } from 'react';

import { cn } from '@/shared/lib/utils';

import styles from './radioInput.module.scss';

type RadioInputProps = ComponentPropsWithRef<'input'> & {
    label: string;
    labelClassName?: string;
    inputClassName?: string;
};

export const RadioInput = ({ className, inputClassName, labelClassName, label, id, value, name, ...props }: RadioInputProps) => {
    return (
        <div className={cn(styles.container, className)}>
            <Input
                value={value}
                name={name}
                id={id}
                {...props}
                className={inputClassName}
            />
            <Label
                htmlFor={id}
                className={labelClassName}
            >
                {label}
            </Label>
        </div>
    );
};

type LabelProps = ComponentPropsWithRef<'label'>;

const Label = ({ children, className, ...props }: LabelProps) => {
    return (
        <label
            className={cn(styles.label, className)}
            {...props}
        >
            {children}
        </label>
    );
};

type InputProps = ComponentPropsWithRef<'input'>;

const Input = ({ className, ...props }: InputProps) => {
    return (
        <input
            type={'radio'}
            className={cn(styles.input, className)}
            {...props}
        />
    );
};
