import type { ReactNode } from 'react';

export const StickyBarWide = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'flex align-center justify-between'} style={{ columnGap: '1rem' }}>
            {children}
        </div>
    );
};
