'use client';

import { useState } from 'react';

const useOpenState = () => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const toggle = () => setIsOpened((prevState) => !prevState);

	const close = () => setIsOpened(false);

	const open = () => setIsOpened(true);

	return { isOpened, toggle, close, open };
};

export default useOpenState;
