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

type BaseInputType = Omit<NativeInputProps, 'checked' | 'defaultChecked' | 'onChange' | 'type'>;

export type InputType = BaseInputType & InputStateType;
export type LabelType = Omit<ComponentPropsWithRef<'label'>, 'children'> & { children: ReactNode };
export type ContainerType = Omit<ComponentPropsWithRef<'div'>, 'children'> & { children: ReactNode };

/** The name prop used to identify this checkbox in form data. For example: newsletter, terms, etc. */
/** The value submitted for this checkbox when selected. For example: accepted, yes, etc. */
/** Optional unique identifier used to associate the input with its label. */
export type PickedInputTypes = Omit<BaseInputType, 'className' | 'id'> & InputStateType;

export type DefaultCheckboxType = PickedInputTypes & {
    label: string;
    id?: string;
    classNames?: {
        container?: string;
        input?: string;
        label?: string;
    };
};
