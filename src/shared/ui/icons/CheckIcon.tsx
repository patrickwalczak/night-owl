import type { SVGProps } from 'react';

type CheckIconProps = SVGProps<SVGSVGElement>;

export const CheckIcon = ({
    width = 24,
    height = 24,
    fill = 'none',
    stroke = '#292929',
    'aria-hidden': ariaHidden = true,
    ...props
}: CheckIconProps) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={'0 0 24 24'}
            fill={fill}
            xmlns={'http://www.w3.org/2000/svg'}
            aria-hidden={ariaHidden}
            {...props}
        >
            <path
                d={'M20 7L10 17L5 12'}
                stroke={stroke}
                strokeWidth={'2'}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
            />
        </svg>
    );
};
