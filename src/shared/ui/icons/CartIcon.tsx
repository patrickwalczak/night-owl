import { type SVGProps } from 'react';

export type SvgIconType = SVGProps<SVGSVGElement>;

export const CartIcon = ({
    width = 30,
    height = 30,
    fill = 'none',
    stroke = 'currentColor',
    'aria-hidden': ariaHidden = true,
    ...props
}: SvgIconType) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={'0 0 30 30'}
            fill={fill}
            xmlns={'http://www.w3.org/2000/svg'}
            aria-hidden={ariaHidden}
            {...props}
        >
            <path
                d={
                    'M5 11.25H25L23.9154 23.1811C23.8217 24.2112 22.958 25 21.9236 25H8.07643C7.04202 25 6.17829 24.2112 6.08464 23.1811L5 11.25Z'
                }
                stroke={stroke}
                strokeLinejoin={'round'}
            />
            <path
                d={
                    'M10 13.75V10C10 7.23858 12.2386 5 15 5C17.7614 5 20 7.23858 20 10V13.75'
                }
                stroke={stroke}
                strokeLinecap={'round'}
            />
        </svg>
    );
};
