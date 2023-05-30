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
	const [activeRestaurant, setActiveRestaurant] = useState(restaurants[0]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		pusherClient.subscribe('restaurants-list');

		const listAddHandler = (restaurant: Restaurant & { votes: Vote[] }) => {
			setRestaurantList((current) => [...current, restaurant]);
			return restaurant;
		};

		const listRemoveHandler = (restaurant: Restaurant & { votes: Vote[] }) => {
			setRestaurantList((current) => current.filter((item) => item.id !== restaurant.id));
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
		<ul className='flex items-center justify-center gap-4 flex-wrap'>
			{restaurantList.map((restaurant) => (
				<li
					key={restaurant.id}
					className='text-lg font-normal'
				>
					<RestaurantCard
						restaurantId={restaurant.id}
						name={restaurant.name}
						createdByName={restaurant.createdByName}
						initialVotes={restaurant.votes}
						userId={userId}
					/>
				</li>
			))}
		</ul>
	);
};
