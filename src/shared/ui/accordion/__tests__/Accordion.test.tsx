import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createRef, type MouseEvent, StrictMode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Accordion } from '../Accordion';

afterEach(cleanup);

describe('Accordion', () => {
    it('keeps the existing API and toggles the associated panel without submitting a form', () => {
        const onSubmit = vi.fn(event => event.preventDefault());

        render(
            <form onSubmit={onSubmit}>
                <Accordion.Root>
                    <Accordion.Header headingText={'Brand'} />
                    <Accordion.Panel>{'Available brands'}</Accordion.Panel>
                </Accordion.Root>
            </form>,
        );

        const button = screen.getByRole('button', { name: 'Brand' });
        const panel = screen.getByRole('region', { hidden: true }) as HTMLDivElement;

        expect(button.getAttribute('aria-controls')).toBe(panel.id);
        expect(panel.getAttribute('aria-labelledby')).toBe(button.id);
        expect(button.getAttribute('aria-expanded')).toBe('false');
        expect(panel.hidden).toBe(true);

        fireEvent.click(button);

        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(panel.hidden).toBe(false);

        fireEvent.click(button);

        expect(button.getAttribute('aria-expanded')).toBe('false');
        expect(panel.hidden).toBe(true);
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('starts expanded and emits one change per interaction in StrictMode while preserving panel state', () => {
        const onExpandedChange = vi.fn();

        render(
            <StrictMode>
                <Accordion.Root defaultExpanded onExpandedChange={onExpandedChange}>
                    <Accordion.Header headingText={'Brand'} />
                    <Accordion.Panel>
                        <input aria-label={'Search brands'} defaultValue={'Acme'} />
                    </Accordion.Panel>
                </Accordion.Root>
            </StrictMode>,
        );

        const button = screen.getByRole('button', { name: 'Brand' });
        const input = screen.getByRole('textbox', { name: 'Search brands' }) as HTMLInputElement;

        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(onExpandedChange).not.toHaveBeenCalled();

        fireEvent.change(input, { target: { value: 'Updated' } });
        fireEvent.click(button);

        expect(screen.queryByRole('textbox')).toBeNull();
        expect(onExpandedChange.mock.calls).toEqual([[false]]);

        fireEvent.click(button);

        expect(screen.getByRole('textbox')).toBe(input);
        expect(input.value).toBe('Updated');
        expect(onExpandedChange.mock.calls).toEqual([[false], [true]]);
    });

    it('calls both analytics handlers with the button as currentTarget before requesting a change', () => {
        const calls: string[] = [];
        const targets: EventTarget[] = [];

        render(
            <Accordion.Root onExpandedChange={() => calls.push('change')}>
                <Accordion.Header
                    headingText={<span>{'Brand'}</span>}
                    onClick={(event) => {
                        calls.push('header');
                        targets.push(event.currentTarget);
                    }}
                    buttonProps={{
                        onClick: (event) => {
                            calls.push('button');
                            targets.push(event.currentTarget);
                        },
                    }}
                />
                <Accordion.Panel>{'Available brands'}</Accordion.Panel>
            </Accordion.Root>,
        );

        fireEvent.click(screen.getByText('Brand'));

        const button = screen.getByRole('button', { name: 'Brand' });

        expect(calls).toEqual(['header', 'button', 'change']);
        expect(targets).toEqual([button, button]);
        expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it.each(['header', 'button'])('allows the %s handler to cancel toggling', (source) => {
        const onExpandedChange = vi.fn();
        const onHeaderClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
            if (source === 'header') event.preventDefault();
        });
        const onButtonClick = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
            if (source === 'button') event.preventDefault();
        });

        render(
            <Accordion.Root onExpandedChange={onExpandedChange}>
                <Accordion.Header
                    headingText={'Brand'}
                    onClick={onHeaderClick}
                    buttonProps={{ onClick: onButtonClick }}
                />
                <Accordion.Panel>{'Available brands'}</Accordion.Panel>
            </Accordion.Root>,
        );

        const button = screen.getByRole('button', { name: 'Brand' });

        fireEvent.click(button);

        expect(onHeaderClick).toHaveBeenCalledTimes(1);
        expect(onButtonClick).toHaveBeenCalledTimes(1);
        expect(onExpandedChange).not.toHaveBeenCalled();
        expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it.each([
        { rootDisabled: true, buttonDisabled: false },
        { rootDisabled: false, buttonDisabled: true },
    ])('blocks interaction when disabled: %j', ({ rootDisabled, buttonDisabled }) => {
        const onClick = vi.fn();
        const onExpandedChange = vi.fn();

        render(
            <Accordion.Root disabled={rootDisabled} onExpandedChange={onExpandedChange}>
                <Accordion.Header
                    headingText={'Brand'}
                    onClick={onClick}
                    buttonProps={{ disabled: buttonDisabled }}
                />
                <Accordion.Panel>{'Available brands'}</Accordion.Panel>
            </Accordion.Root>,
        );

        const button = screen.getByRole('button', { name: 'Brand' }) as HTMLButtonElement;

        fireEvent.click(button);

        expect(button.disabled).toBe(true);
        expect(button.getAttribute('aria-expanded')).toBe('false');
        expect(onClick).not.toHaveBeenCalled();
        expect(onExpandedChange).not.toHaveBeenCalled();
    });

    it('forwards DOM props and refs to their intended elements and supports rich heading content', () => {
        const rootRef = createRef<HTMLDivElement>();
        const headingRef = createRef<HTMLHeadingElement>();
        const buttonRef = createRef<HTMLButtonElement>();
        const panelRef = createRef<HTMLDivElement>();

        render(
            <Accordion.Root ref={rootRef} id={'brand-filter'} className={'custom-root'} data-testid={'root'}>
                <Accordion.Header
                    ref={headingRef}
                    headingLevel={2}
                    headingText={(
                        <span>
                            {'Brand '}
                            <span>{'(3)'}</span>
                        </span>
                    )}
                    className={'custom-heading'}
                    data-testid={'heading'}
                    buttonProps={{
                        'ref': buttonRef,
                        'className': 'custom-button',
                        'data-testid': 'trigger',
                        'data-gtm': 'brand-filter',
                        'style': { padding: 0 },
                    }}
                />
                <Accordion.Panel ref={panelRef} className={'custom-panel'} data-testid={'panel'}>
                    {'Available brands'}
                </Accordion.Panel>
            </Accordion.Root>,
        );

        expect(rootRef.current).toBe(screen.getByTestId('root'));
        expect(rootRef.current?.id).toBe('brand-filter');
        expect(rootRef.current?.className).toContain('custom-root');
        expect(headingRef.current).toBe(screen.getByRole('heading', { level: 2, name: 'Brand (3)' }));
        expect(headingRef.current).toBe(screen.getByTestId('heading'));
        expect(headingRef.current?.className).toContain('custom-heading');
        expect(buttonRef.current).toBe(screen.getByTestId('trigger'));
        expect(buttonRef.current?.className).toContain('custom-button');
        expect(buttonRef.current?.getAttribute('data-gtm')).toBe('brand-filter');
        expect(buttonRef.current?.style.padding).toBe('0px');
        expect(panelRef.current).toBe(screen.getByTestId('panel'));
        expect(panelRef.current?.className).toContain('custom-panel');
    });

    it('keeps multiple instances independent with unique accessibility identifiers', () => {
        render(
            <>
                <Accordion.Root>
                    <Accordion.Header headingText={'Brand'} />
                    <Accordion.Panel>{'Available brands'}</Accordion.Panel>
                </Accordion.Root>
                <Accordion.Root>
                    <Accordion.Header headingText={'Size'} />
                    <Accordion.Panel>{'Available sizes'}</Accordion.Panel>
                </Accordion.Root>
            </>,
        );

        const brand = screen.getByRole('button', { name: 'Brand' });
        const size = screen.getByRole('button', { name: 'Size' });

        fireEvent.click(brand);

        expect(brand.id).not.toBe(size.id);
        expect(brand.getAttribute('aria-controls')).not.toBe(size.getAttribute('aria-controls'));
        expect(screen.getByRole('region', { name: 'Brand' })).toBeDefined();
        expect(size.getAttribute('aria-expanded')).toBe('false');
        expect(screen.queryByRole('region', { name: 'Size' })).toBeNull();
    });
});
