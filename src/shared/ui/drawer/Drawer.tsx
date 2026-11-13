import { DrawerClose } from './DrawerClose';
import { DrawerHeader } from './DrawerHeader';
import { DrawerHeading } from './DrawerHeading';
import { DrawerMain } from './DrawerMain';

export type { DrawerPosition } from './DrawerMain';

export const Drawer = {
    Main: DrawerMain,
    Header: DrawerHeader,
    Heading: DrawerHeading,
    Close: DrawerClose,
};
