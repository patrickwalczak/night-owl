'use client';

/** A separate layer survives removal of the dialog's ViewTransition snapshot. */
export const DrawerBackdrop = ({ isOpen, className }: { isOpen: boolean; className: string }) => (
    <div aria-hidden={true} className={className} data-open={isOpen} />
);
