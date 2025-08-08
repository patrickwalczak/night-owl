import { useState } from 'react';

const useIsDropdownExpanded = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const expandDropdown = () => {
		setIsExpanded(true);
	};

	const hideDropdown = () => {
		setIsExpanded(false);
	};

	return {
		isExpanded,
		expandDropdown,
		hideDropdown,
		setIsExpanded,
	};
};

export default useIsDropdownExpanded;
