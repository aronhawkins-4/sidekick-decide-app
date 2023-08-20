export type GoogleRestaurant = {
	name: string;
	place_id: string;
	formatted_address: string;
	icon: string;
	rating: string;
	photos: {
		photo_reference: string;
	}[];
};
