import React from 'react';

const Filters = ({ className = '' }: { className?: string }) => {
	return (
		<svg
			aria-hidden="true"
			className={className}
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M4.5 8H13.5" stroke="var(--color-owl-gray-900)" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M17.5 8L20.5 8" stroke="var(--color-owl-gray-900)" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11.5 16L20.5 16" stroke="var(--color-owl-gray-900)" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.5 16H7.5" stroke="var(--color-owl-gray-900)" strokeLinecap="round" strokeLinejoin="round" />
			<circle cx="9.5" cy="16" r="2" stroke="var(--color-owl-gray-900)" />
			<circle cx="15.5" cy="8" r="2" stroke="var(--color-owl-gray-900)" />
		</svg>
	);
};

export default Filters;
