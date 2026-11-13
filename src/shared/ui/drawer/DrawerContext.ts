import { createContext } from 'react';

export const DrawerContext = createContext<{ onClose: () => void; headingId: string } | null>(null);
