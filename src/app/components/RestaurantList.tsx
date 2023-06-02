'use client';

import { RestaurantCard } from './RestaurantCard';
import { Restaurant, Vote } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { pusherClient } from '../libs/pusher';
import { GoogleRestaurant } from '../types/GoogleRestaurant';
import useMapsQueryStore from '../hooks/useMapsQueryStore';
import axios from 'axios';
import useGoogleRestaurants, { IUseGoogleRestaurants } from '../hooks/useGoogleRestaurants';
import { useRouter, useSearchParams } from 'next/navigation';
import { LocationForm } from './LocationForm';

interface RestaurantListProps {
	// restaurants: GoogleRestaurant[];
	userId?: string;
}
export const RestaurantList: React.FC<RestaurantListProps> = ({ userId }) => {
	const [queryString, setQueryString] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [restaurants, setRestaurants] = useState<GoogleRestaurant[]>([]);

	useEffect(() => {
		async function fetchRestaurants() {
			await axios
				.post('/api/googleMaps/', {
					data: {
						query: queryString,
						userId: userId,
					},
				})
				.then((res) => {
					setRestaurants(res.data);
				})
				.catch((error) => {
					throw new Error(error);
				})
				.finally(() => setIsLoading(false));
		}
		fetchRestaurants();
		console.log(restaurants);
		// console.log(isLoading, gRes);
		// if (queryString !== '') {
		// 	axios.defaults.withCredentials = false;
		// 	axios
		// 		.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${queryString}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`)
		// 		.then((res) => setLocations(res as unknown as GoogleRestaurant[]))
		// 		.catch((error) => {
		// 			throw new Error(error);
		// 		});
		// }
		// pusherClient.subscribe('restaurants-list');
		// const listAddHandler = (restaurant: Restaurant & { votes: Vote[] }) => {
		// 	// setRestaurantList((current) => [...current, restaurant]);
		// 	return restaurant;
		// };
		// const listRemoveHandler = (restaurant: Restaurant & { votes: Vote[] }) => {
		// 	// setRestaurantList((current) => current.filter((item) => item.id !== restaurant.id));
		// 	return restaurant;
		// };
		// pusherClient.bind('restaurant:new', listAddHandler);
		// pusherClient.bind('restaurant:remove', listRemoveHandler);
		// return () => {
		// 	pusherClient.unsubscribe('restaurants-list');
		// 	pusherClient.unbind('restaurant:new', listAddHandler);
		// 	pusherClient.unbind('restaurant:remove', listRemoveHandler);
		// };
	}, [queryString, userId]);

	if (!userId) {
		return <div>Invalid UserID</div>;
	}
	return (
		// <div className='flex flex-col items-center justify-center'>
		// 	<div className='text-lg font-normal'>
		// 		<RestaurantCard
		// 			restaurantId={activeRestaurant.id}
		// 			name={activeRestaurant.name}
		// 			createdByName={activeRestaurant.createdByName}
		// 			initialVotes={activeRestaurant.votes}
		// 			userId={userId}
		// 		/>
		// 	</div>
		// 	<div className='flex gap-2 items-center justify-center'>
		// 		<button
		// 			onClick={() =>
		// 				setActiveRestaurant(() => {
		// 					if (activeIndex > 0) {
		// 						setActiveIndex((current) => current - 1);
		// 						return restaurantList[activeIndex];
		// 					}
		// 					setActiveIndex(restaurantList.length - 1);
		// 					return restaurantList[activeIndex];
		// 				})
		// 			}
		// 		>
		// 			Previous
		// 		</button>
		// 		<button
		// 			onClick={() =>
		// 				setActiveRestaurant(() => {
		// 					if (activeIndex < restaurantList.length - 1) {
		// 						setActiveIndex((current) => current + 1);
		// 						return restaurantList[activeIndex];
		// 					}
		// 					setActiveIndex(0);
		// 					return restaurantList[activeIndex];
		// 				})
		// 			}
		// 		>
		// 			Next
		// 		</button>
		// 	</div>
		// </div>
		// <ul className='flex items-center justify-center gap-4 flex-wrap'>
		// 	{restaurantList.map((restaurant) => (
		// 		<li
		// 			key={restaurant.id}
		// 			className='text-lg font-normal'
		// 		>
		// 			<RestaurantCard
		// 				restaurantId={restaurant.id}
		// 				name={restaurant.name}
		// 				createdByName={restaurant.createdByName}
		// 				initialVotes={restaurant.votes}
		// 				userId={userId}
		// 			/>
		// 		</li>
		// 	))}
		// </ul>
		<div className='flex flex-col gap-4'>
			<h1 className='text-2xl text-center font-medium'>Restaurants in {queryString.replace('+', ', ')}</h1>
			<ul className='flex items-center justify-center gap-4 flex-wrap'>
				{restaurants.map((location) => (
					<li
						key={location.place_id}
						className='text-lg font-normal'
					>
						<RestaurantCard
							name={location.name}
							userId={userId}
						/>
					</li>
				))}
			</ul>
			<div className='col-span-4 flex justify-center'>
				<LocationForm setQueryString={setQueryString} />
			</div>
		</div>

		// <div>List</div>
	);
};
