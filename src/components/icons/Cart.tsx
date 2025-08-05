import React from 'react';

const Cart = ({ className = '' }: { className?: string }) => {
	return (
		<svg
			className={className}
			width="30"
			height="30"
			viewBox="0 0 30 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5 11.25H25L23.9154 23.1811C23.8217 24.2112 22.958 25 21.9236 25H8.07643C7.04202 25 6.17829 24.2112 6.08464 23.1811L5 11.25Z"
				stroke="black"
				strokeLinejoin="round"
			/>
			<path
				d="M10 13.75V10C10 7.23858 12.2386 5 15 5C17.7614 5 20 7.23858 20 10V13.75"
				stroke="black"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default Cart;
