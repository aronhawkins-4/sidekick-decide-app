'use client';

import { Channel, Members } from 'pusher-js';
import { pusherClient } from '../libs/pusher';
import { useEffect, useState } from 'react';
import useUserCount from '../hooks/useUserCount';
import { Restaurant, Vote } from '@prisma/client';
import { AgreeModal } from '../components/AgreeModal';

interface UserCountProps {
	restaurantList?: (Restaurant & {
		votes: Vote[];
	})[];
}

export const UserCount: React.FC<UserCountProps> = ({ restaurantList }) => {
	const { activeMembers } = useUserCount();
	const [agreedRestaurantName, setAgreedRestaurantName] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	// useEffect(() => {
	// 	restaurantList?.map((restaurant) => {
	// 		const yesVotes = restaurant.votes.filter((vote) => vote.vote === true).length;
	// 		if (yesVotes === activeMembers) {
	// 			setAgreedRestaurantName(restaurant.name);
	// 			setIsModalOpen(true);
	// 		}
	// 		return restaurant;
	// 	});
	// }, [restaurantList, activeMembers, agreedRestaurantName]);
	return (
		<div className='w-full flex justify-center mt-6'>
			{/* <AgreeModal
				restaurantName={agreedRestaurantName}
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/> */}

			<p className='text-lg font-medium text-gray-500'>Active Users: {activeMembers}</p>
		</div>
	);
};
