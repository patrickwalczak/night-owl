import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import * as ReactModule from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DialogDrawerMotion } from '../dialogDrawerMotion/DialogDrawerMotion';
import { DialogDrawerTransition } from '../dialogDrawerTransition/DialogDrawerTransition';

// jsdom has no view-transition renderer; these tests verify modal behavior.
vi.mock('react', async importOriginal => ({
    ...await importOriginal<typeof ReactModule>(),
    ViewTransition: ({ children }: { children: ReactModule.ReactNode }) => children,
}));

beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
    })));
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
        configurable: true,
        value: vi.fn(function (this: HTMLDialogElement) { this.setAttribute('open', ''); }),
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
        configurable: true,
        value: vi.fn(function (this: HTMLDialogElement) {
            this.removeAttribute('open');
            // Native close events are queued, including Strict Mode effect cleanup.
            queueMicrotask(() => this.dispatchEvent(new Event('close')));
        }),
    });
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe('DialogDrawerTransition', () => {
    it('opens as a modal, forwards the ref and closes when visibility changes', async () => {
        const ref = ReactModule.createRef<HTMLDialogElement>();
        const props = { 'aria-label': 'Filters', 'onClose': vi.fn(), ref };
        const { rerender, queryByRole, getByRole } = render(<DialogDrawerTransition {...props} isOpen={false} />);
        expect(queryByRole('dialog')).toBeNull();
        rerender(<DialogDrawerTransition {...props} isOpen={true} />);
        await waitFor(() => expect(getByRole('dialog')).toBe(ref.current));
        expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
        rerender(<DialogDrawerTransition {...props} isOpen={false} />);
        await waitFor(() => expect(queryByRole('dialog')).toBeNull());
        expect(HTMLDialogElement.prototype.close).toHaveBeenCalledOnce();
        expect(props.onClose).not.toHaveBeenCalled();
    });

    it('requests close on Escape and backdrop, without closing on content clicks', async () => {
        const onClose = vi.fn();
        const { getByRole } = render(
            <DialogDrawerTransition aria-label={'Filters'} isOpen={true} onClose={onClose} side={'left'}>
                <button>{'Content'}</button>
            </DialogDrawerTransition>,
        );
        const dialog = await waitFor(() => getByRole('dialog'));
        expect(dialog.dataset.side).toBe('left');
        fireEvent.click(getByRole('button'));
        expect(onClose).not.toHaveBeenCalled();
        const cancel = new Event('cancel', { cancelable: true, bubbles: true });
        fireEvent(dialog, cancel);
        expect(cancel.defaultPrevented).toBe(true);
        expect(dialog.hasAttribute('open')).toBe(true);
        expect(onClose).toHaveBeenCalledOnce();
        fireEvent.click(dialog, { clientX: -10 });
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});

describe.each([
    ['Motion', DialogDrawerMotion],
    ['ViewTransition', DialogDrawerTransition],
])('%s drawer in Strict Mode', (_name, Drawer) => {
    it('stays open after effect replay and queued native close events', async () => {
        const onClose = vi.fn();
        const { getByRole } = render(
            <ReactModule.StrictMode>
                <Drawer aria-label={'Preview'} isOpen={true} onClose={onClose}>
                    <button>{'Content'}</button>
                </Drawer>
            </ReactModule.StrictMode>,
        );
        const dialog = await waitFor(() => getByRole('dialog'));
        await waitFor(() => expect(HTMLDialogElement.prototype.close).toHaveBeenCalled());
        expect(dialog.hasAttribute('open')).toBe(true);
        expect(onClose).not.toHaveBeenCalled();
        fireEvent.click(getByRole('button'));
        expect(onClose).not.toHaveBeenCalled();
        fireEvent(dialog, new Event('cancel', { cancelable: true, bubbles: true }));
        expect(onClose).toHaveBeenCalledOnce();
    });
});
