import { useEffect, useState } from 'react';

const useIsScrolled = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			if (scrollY < 60) setIsScrolled(false);
			else setIsScrolled(true);
		};

		handleScroll();

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return isScrolled;
};

export default useIsScrolled;
