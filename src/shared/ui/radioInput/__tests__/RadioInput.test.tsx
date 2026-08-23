import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { RadioInput } from '../RadioInput';
import { type RadioInputType } from '../types';

afterEach(cleanup);

describe('RadioInput', () => {
    it('connects label with a native radio input', () => {
        render(
            <RadioInput
                id={'color-1'}
                label={'Color 1'}
                name={'color'}
                value={'color_1'}
            />,
        );

        const input = screen.getByLabelText('Color 1') as HTMLInputElement;

        expect(input.id).toBe('color-1');
        expect(input.name).toBe('color');
        expect(input.type).toBe('radio');
        expect(input.value).toBe('color_1');
    });

    it('supports controlled checked state', () => {
        const onChange = vi.fn();

        const { rerender } = render(
            <RadioInput
                checked={false}
                label={'Color 1'}
                name={'color'}
                onChange={onChange}
                value={'color_1'}
            />,
        );

        expect((screen.getByLabelText('Color 1') as HTMLInputElement).checked).toBe(false);

        rerender(
            <RadioInput
                checked={true}
                label={'Color 1'}
                name={'color'}
                onChange={onChange}
                value={'color_1'}
            />,
        );

        expect((screen.getByLabelText('Color 1') as HTMLInputElement).checked).toBe(true);
    });

    it('calls onChange when selected through the label', () => {
        const onChange = vi.fn();

        render(
            <RadioInput
                label={'Color 1'}
                name={'color'}
                onChange={onChange}
                value={'color_1'}
            />,
        );

        fireEvent.click(screen.getByText('Color 1'));

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('applies custom and test class names', () => {
        render(
            <RadioInput
                classNames={{
                    input: 'custom-input',
                    label: 'custom-label',
                    wrapper: 'custom-wrapper',
                }}
                label={'Color 1'}
                name={'color'}
                testClassNames={{
                    input: 'test-input',
                    label: 'test-label',
                    wrapper: 'test-wrapper',
                }}
                value={'color_1'}
            />,
        );

        const input = screen.getByLabelText('Color 1') as HTMLInputElement;
        const label = screen.getByText('Color 1');

        expect(input.className).toContain('custom-input');
        expect(input.className).toContain('test-input');
        expect(label.className).toContain('custom-label');
        expect(label.className).toContain('test-label');
        expect(input.parentElement?.className).toContain('custom-wrapper');
        expect(input.parentElement?.className).toContain('test-wrapper');
    });

    it('keeps the input type as radio', () => {
        const props = {
            label: 'Color 1',
            name: 'color',
            type: 'checkbox',
            value: 'color_1',
        } as unknown as RadioInputType;

        render(<RadioInput {...props} />);

        expect((screen.getByLabelText('Color 1') as HTMLInputElement).type).toBe('radio');
    });
});
