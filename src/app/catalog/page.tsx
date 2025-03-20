import React from 'react';
import Navigation from '../../components/navigation/Navigation';
import Listing from './components/listing/Listing';

const Catalog = () => {
	return (
		<>
			<Navigation />
			<main>
				<Listing />
			</main>
		</>
	);
};

export default Catalog;
