import axios from 'axios';
import { GoogleRestaurant } from '../types/GoogleRestaurant';

export interface IParams {
	query?: string;
}
const getGoogleRestaurants = async (params: IParams): Promise<GoogleRestaurant[]> => {
	let gRes: GoogleRestaurant[] = [];
	if (params) {
		const query = params.query;
		console.log(query);
		if (query) {
			await axios
				.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`)
				.then((res) => {
					gRes = res?.data?.results;
				})
				.catch((error) => {
					throw new Error(error);
				});
		}
	}

	return gRes;
};

export default getGoogleRestaurants;
