import axios from 'axios';
import { GoogleRestaurant } from '../types/GoogleRestaurant';
import { useState } from 'react';

export interface IUseGoogleRestaurants {
	queryString: string;
	userId: string;
}
const useGoogleRestaurants = async ({ queryString, userId }: { queryString: IUseGoogleRestaurants; userId: IUseGoogleRestaurants }) => {
	return await axios
		.post('/api/googleMaps/', {
			data: {
				query: queryString,
				userId: userId,
			},
		})
		.then((res) => {
			return res.data.results;
		})
		.catch((error) => {
			throw new Error(error);
		});
};

export default useGoogleRestaurants;
