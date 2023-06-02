import axios from 'axios';
import { GoogleRestaurant } from '../types/GoogleRestaurant';
import { useState } from 'react';

export interface IUseGoogleRestaurants {
	query?: string | null;
}
const useGoogleRestaurants = ({ query }: { query: IUseGoogleRestaurants }) => {
	let gRes: GoogleRestaurant[] = [];
	const [isLoading, setIsLoading] = useState(false);

	if (query.query !== '') {
		axios
			.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query.query}+restaurants&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`)
			.then((res) => {
				gRes = res?.data?.results;
			})
			.catch((error) => {
				throw new Error(error);
			});
		// .finally(() => setIsLoading(false));
	}
	// setIsLoading(true);

	return { isLoading, gRes };
};

export default useGoogleRestaurants;
