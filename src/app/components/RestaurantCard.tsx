'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VoteForm } from './VoteForm';
import { Vote } from '@prisma/client';
import { BiTrash } from 'react-icons/bi';
import { pusherClient } from '@/app/libs/pusher';
import { useEffect } from 'react';

interface RestaurantCardProps {
	name: string;
	restaurantId: string;
	createdByName: string;
	votes: Vote[];
	userId: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, restaurantId, userId, createdByName, votes }) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');
	const [yesVotes, setYesVotes] = useState((votes || []).filter((vote) => vote.vote === true).length);
	const [noVotes, setNoVotes] = useState((votes || []).filter((vote) => vote.vote === false).length);

	useEffect(() => {
		pusherClient.subscribe(restaurantId);
		console.log(restaurantId);
		const voteHandler = (vote: Vote) => {
			if (vote.vote) {
				setYesVotes((current) => {
					if (vote.restaurantId === restaurantId) {
						return current + 1;
					}
					return current;
				});
			} else {
				setNoVotes((current) => {
					if (vote.restaurantId === restaurantId) {
						return current + 1;
					}
					return current;
				});
			}
			return vote;
		};

		pusherClient.bind('vote:new', voteHandler);

		return () => {
			pusherClient.unsubscribe(restaurantId);
			pusherClient.unbind('vote:new', voteHandler);
		};
	}, [restaurantId]);

	const onDelete = useCallback(
		(resId: string) => {
			setDeletingId(resId);
			axios
				.delete(`/api/restaurants/${resId}`)
				.then(() => {
					toast.success('Restaurant deleted');
					router.refresh();
				})
				.catch((error) => {
					toast.error(error);
				})
				.finally(() => setDeletingId(''));
		},
		[router]
	);

	return (
		<div className={`w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${deletingId === restaurantId && 'opacity-80'}`}>
			<div className='flex flex-col items-center p-10 relative'>
				<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{name}</h5>
				<div className='flex flex-col mt-2 space-x-3'></div>
				<VoteForm
					userId={userId}
					restaurantId={restaurantId}
				/>
				<p className='mt-4 text-sm font-light text-gray-400'>Created by: {createdByName}</p>
				<div className='flex gap-4'>
					<p className='mt-2 text-sm font-light text-gray-400'>Votes for: {yesVotes}</p>
					<p className='mt-2 text-sm font-light text-gray-400'>Votes against: {noVotes}</p>
				</div>

				<button
					onClick={() => onDelete(restaurantId)}
					className='p-2 rounded-full bg-red-500 hover:bg-red-800 transition absolute bottom-4 right-4'
				>
					<BiTrash size={16} />
				</button>
			</div>
		</div>
	);
};
