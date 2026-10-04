'use client';

import 'client-only';
import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { makeStore } from '@/app/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
    const [store] = useState(makeStore);
    const [serverState] = useState(() => store.getState());

    return <Provider store={store} serverState={serverState}>{children}</Provider>;
}
