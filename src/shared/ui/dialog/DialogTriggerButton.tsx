import { type ComponentPropsWithRef, type MouseEventHandler, type PropsWithChildren } from 'react';

type DialogTriggerButtonType = PropsWithChildren<
    Omit<
        ComponentPropsWithRef<'button'>,
        | 'type'
        | 'aria-haspopup'
        | 'aria-expanded'
        | 'aria-controls'
        | 'onClick'
    >
> & {
    dialogId: string;
    isDialogOpen: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export const DialogTriggerButton = ({
    children,
    dialogId,
    isDialogOpen,
    onClick,
    ...props
}: DialogTriggerButtonType) => {
    return (
        <button
            {...props}
            type={'button'}
            aria-haspopup={'dialog'}
            aria-expanded={isDialogOpen}
            aria-controls={dialogId}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
