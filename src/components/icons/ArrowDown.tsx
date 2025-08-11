import React from 'react';

const ArrowDown = ({ className = '' }: { className?: string }) => {
	return (
		<svg
			aria-hidden="true"
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7 10L12 15"
				stroke="var(--color-owl-gray-900)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M12 15L17 10"
				stroke="var(--color-owl-gray-900)"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default ArrowDown;
