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
import { useQuery } from '@tanstack/react-query';

interface RestaurantListProps {
	userId?: string;
}
export const RestaurantList: React.FC<RestaurantListProps> = ({ userId }) => {
	const [queryString, setQueryString] = useState('');
	const [restaurants, setRestaurants] = useState<GoogleRestaurant[]>([]);
	const [placeTitle, setPlaceTitle] = useState('');

	async function fetchRestaurants() {
		return await axios
			.post('/api/googleMaps/', {
				data: {
					query: queryString,
					userId: userId,
				},
			})
			.then((res) => {
				const place_title = queryString.replace('+', ', ');
				setPlaceTitle(place_title);
				return res.data.results;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
	const { isLoading, data, fetchStatus, isPreviousData } = useQuery({
		queryKey: ['google-restaurants', queryString],
		queryFn: fetchRestaurants,
		enabled: !!queryString,
	});

	useEffect(() => {
		if (data) setRestaurants(data);
	}, [data, queryString, isLoading]);

	if (!userId) {
		return <div>Invalid UserID</div>;
	}
	return (
		<div className='flex flex-col gap-4'>
			{placeTitle !== '' && <h1 className='text-2xl text-center font-medium'>Restaurants in {placeTitle}</h1>}

			<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 flex-wrap'>
				{restaurants?.map((location) => (
					<li
						key={location.place_id}
						className='text-lg font-normal w-full h-full'
					>
						<RestaurantCard
							name={location.name}
							address={location.formatted_address}
							rating={location.rating}
							placeId={location.place_id}
							photo={location?.photos[0]?.photo_reference}
							userId={userId}
						/>
					</li>
				))}
			</ul>
			<div className='col-span-4 flex justify-center'>
				<LocationForm
					setQueryString={setQueryString}
					isLoading={fetchStatus === 'fetching'}
				/>
			</div>
		</div>
	);
};
