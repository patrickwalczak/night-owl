import { mergeClasses } from '@/utils/mergeClasses';
import React from 'react';

const LoadingPage = () => {
	return (
		<div className={mergeClasses('flex', 'align-center', 'justify-center')}>
			loading loadingloadingloadingloadingloading loading loading loading loading loadingloading loading loading loading
			loading loadingloading loading loading loading loading loading loading loading loading loading loading loading
			loading loadingloading loading loading loading loading loading loading loading loading loading loading
			loadingloading loading loading loading loading loading loading loading loading loading loading loading loading
			loading loading loading loading loading loading loading loading loading loading loading loading loading loading
			loading
		</div>
	);
};

export default LoadingPage;
