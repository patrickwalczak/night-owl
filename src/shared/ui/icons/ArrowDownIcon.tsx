export const ArrowDownIcon = ({ className = '' }: { className?: string }) => {
    return (
        <svg
            aria-hidden={'true'}
            className={className}
            width={'24'}
            height={'24'}
            viewBox={'0 0 24 24'}
            fill={'none'}
            xmlns={'http://www.w3.org/2000/svg'}
        >
            <path
                d={'M7 10L12 15'}
                stroke={'var(--color-owl-blue-800)'}
                strokeWidth={'2'}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
            />
            <path
                d={'M12 15L17 10'}
                stroke={'var(--color-owl-blue-800)'}
                strokeWidth={'2'}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
            />
        </svg>
    );
};
