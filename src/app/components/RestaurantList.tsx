'use client';

import { RestaurantCard } from './RestaurantCard';
import { Restaurant, Vote } from '@prisma/client';
import { useEffect, useState } from 'react';
import { pusherClient } from '../libs/pusher';

interface RestaurantListProps {
	restaurants: (Restaurant & {
		votes: Vote[];
	})[];
	userId?: string;
}
export const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, userId }) => {
	const [restaurantList, setRestaurantList] = useState(restaurants);

	useEffect(() => {
		pusherClient.subscribe('restaurants-list');

		const listAddHandler = (restaurant: Restaurant & { votes: Vote[] }) => {
			setRestaurantList((current) => [...current, restaurant]);
			return restaurant;
		};

		const listRemoveHandler = (restaurant: Restaurant & { votes: Vote[] }) => {
			setRestaurantList((current) => current.filter((item) => item.id !== restaurant.id));
			console.log(restaurantList);
			return restaurant;
		};

		pusherClient.bind('restaurant:new', listAddHandler);
		pusherClient.bind('restaurant:remove', listRemoveHandler);

		return () => {
			pusherClient.unsubscribe('restaurants-list');
			pusherClient.unbind('restaurant:new', listAddHandler);
			pusherClient.unbind('restaurant:remove', listRemoveHandler);
		};
	}, [restaurantList]);

	if (!userId) {
		return <div>Invalid UserID</div>;
	}
	return (
		<ul className='flex items-center justify-center gap-4'>
			{restaurantList.map((restaurant) => (
				<li
					key={restaurant.id}
					className='text-lg font-normal'
				>
					<RestaurantCard
						restaurantId={restaurant.id}
						name={restaurant.name}
						createdByName={restaurant.createdByName}
						votes={restaurant.votes}
						userId={userId}
					/>
				</li>
			))}
		</ul>
	);
};
