import { type ComponentPropsWithRef, type ReactNode } from 'react';

export type InputType = Omit<ComponentPropsWithRef<'input'>, 'type'>;
export type LabelType = Omit<ComponentPropsWithRef<'label'>, 'children'> & { children: ReactNode };
export type ContainerType = Omit<ComponentPropsWithRef<'div'>, 'children'> & { children: ReactNode };

/** The name prop used to group related radio inputs. For example: colors, delivery methods, etc. */
/** The value represented by this radio option. For example: red, courier, etc. */
/** Optional unique identifier used to associate the input with its label. */
export type PickedInputTypes = Pick<ComponentPropsWithRef<'input'>, 'name' | 'value' | 'onChange'>;

export type DefaultCheckboxType = PickedInputTypes & {
    label: string;
    id?: string;
    classNames?: {
        container?: string;
        input?: string;
        label?: string;
    };
};
