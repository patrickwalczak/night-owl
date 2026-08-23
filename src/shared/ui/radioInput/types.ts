import { type ComponentPropsWithRef, type ReactNode } from 'react';

type NativeInputProps = ComponentPropsWithRef<'input'>;

interface ControlledInputState {
    checked: boolean;
    defaultChecked?: never;
    onChange: NonNullable<NativeInputProps['onChange']>;
}

interface UncontrolledInputState {
    checked?: never;
    defaultChecked?: NativeInputProps['defaultChecked'];
    onChange?: NativeInputProps['onChange'];
}

type InputStateType = ControlledInputState | UncontrolledInputState;

export type RadioInputType = Omit<
    NativeInputProps,
    'checked' | 'className' | 'defaultChecked' | 'id' | 'name' | 'onChange' | 'type' | 'value'
> & InputStateType & {
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

export type ContainerType = Omit<ComponentPropsWithRef<'div'>, 'children'> & { children: ReactNode };

export type LabelType = Omit<ComponentPropsWithRef<'label'>, 'children'> & { children: ReactNode };

export type InputType = Omit<NativeInputProps, 'checked' | 'defaultChecked' | 'onChange' | 'type'> & InputStateType;
