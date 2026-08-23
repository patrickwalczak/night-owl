import { type ComponentPropsWithRef } from 'react';

export type RadioInputType = Omit<ComponentPropsWithRef<'input'>, 'className' | 'id' | 'name' | 'type' | 'value'> & {
    label: string;
    /** The name used to group related radio inputs. For example: colors, delivery methods, etc. */
    name: string;
    /** The value represented by this radio option. For example: red, courier, etc. */
    value: string;
    /** Optional unique identifier used to associate the input with its label. */
    id?: string;
    classNames?: {
        wrapper?: string;
        input?: string;
        label?: string;
    };
    testClassNames?: {
        wrapper?: string;
        input?: string;
        label?: string;
    };
};

export type LabelType = ComponentPropsWithRef<'label'>;

export type InputType = ComponentPropsWithRef<'input'>;
