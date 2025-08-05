'use client';

import { useState } from 'react';

const useOpenState = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen((prevState) => !prevState);

	const close = () => setIsOpen(false);

	const open = () => setIsOpen(true);

	return { isOpen, toggle, close, open };
};

export default useOpenState;
