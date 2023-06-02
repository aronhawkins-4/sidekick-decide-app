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
import { ChangeVoteButton } from './ChangeVoteButton';
import useUserCount from '../hooks/useUserCount';
import useAgreedStore from '../hooks/useAgreedStore';

interface RestaurantCardProps {
	name: string;
	restaurantId?: string;
	createdByName?: string;
	initialVotes?: Vote[];
	userId: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, restaurantId, userId, createdByName, initialVotes }) => {
	const router = useRouter();

	const [deletingId, setDeletingId] = useState('');
	const [votes, setVotes] = useState(initialVotes || null);
	const [yesVotes, setYesVotes] = useState((initialVotes || []).filter((vote) => vote.vote === true).length);
	const [hasUserVoted, setHasUserVoted] = useState((initialVotes || []).filter((vote) => vote?.userId === userId).length > 0);
	const [voteId, setVoteId] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const { activeMembers } = useUserCount();
	// const agreedStore = useAgreedStore();

	// const checkVotes = useCallback(() => {
	// 	if (yesVotes === activeMembers && agreedStore.agreedName === '' && !agreedStore.agreedList.includes(name)) {
	// 		agreedStore.setAgreedName(name);
	// 		agreedStore.pushAgreedList(name);
	// 	}
	// }, [activeMembers, yesVotes, agreedStore, name]);

	const voteRemoveHandler = useCallback(
		(vote: Vote) => {
			setVotes((current) => {
				if (current) {
					if (vote.restaurantId === restaurantId) {
						return current.filter((item) => item.id !== vote.id);
					}
					return current;
				}
				return [];
			});
			if (vote.vote === true) {
				setYesVotes((current) => {
					if (vote.restaurantId === restaurantId) {
						return current - 1;
					}
					return current;
				});
			}
			// agreedStore.removeAgreedList(name);
			return vote;
		},
		[restaurantId]
	);

	const voteAddHandler = useCallback(
		(vote: Vote) => {
			if (vote.restaurantId === restaurantId) {
				setVotes((current) => {
					if (current) {
						return [...current, vote];
					}
					return [vote];
				});
				if (vote.vote === true) {
					setYesVotes((current) => {
						if (current) {
							return current + 1;
						}
						return 1;
					});
				}
				// checkVotes();
			}
		},
		[restaurantId]
	);
	useEffect(() => {
		// pusherClient.subscribe(restaurantId);
		pusherClient.bind('vote:new', voteAddHandler);
		pusherClient.bind('vote:remove', voteRemoveHandler);

		// if (activeMembers > 0 && yesVotes === activeMembers && agreedStore.agreedName === '' && !agreedStore.agreedList.includes(name)) {
		// 	agreedStore.setAgreedName(name);
		// 	agreedStore.pushAgreedList(name);
		// }
		// if (yesVotes < activeMembers) {
		// 	agreedStore.resetAgreedName;
		// 	agreedStore.removeAgreedList(name);
		// }

		return () => {
			// pusherClient.unsubscribe(restaurantId);
			pusherClient.unbind('vote:new', voteAddHandler);
			pusherClient.unbind('vote:remove', voteRemoveHandler);
		};
	}, [restaurantId, voteAddHandler, voteRemoveHandler, yesVotes, activeMembers, name]);

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

	const onVote = useCallback((userVoteId: string) => {
		setVoteId(userVoteId);
	}, []);

	return (
		<div
			className={`w-full lg:min-w-[20rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${deletingId === restaurantId && 'opacity-80'} ${
				isDisabled && 'opacity-80 pointer-events-none'
			}`}
		>
			<div className='flex flex-col items-center p-10 relative gap-4'>
				<h5 className='text-xl font-medium text-gray-900 dark:text-white'>{name}</h5>
				{/* {!hasUserVoted && (
					<VoteForm
						userId={userId}
						// restaurantId={restaurantId}
						onVote={onVote}
						onClick={() => {
							setHasUserVoted(true);
						}}
						setIsDisabled={setIsDisabled}
					/>
				)}
				{hasUserVoted && (
					<ChangeVoteButton
						onClick={() => {
							setHasUserVoted(false);
							setVoteId('');
						}}
						voteId={voteId}
						setIsDisabled={setIsDisabled}
					/>
				)} */}
				<div className='flex flex-col gap-1 items-center justify-center'>
					{/* <p className='text-sm font-light text-gray-400'>Created by: {createdByName}</p> */}
					<div className='flex gap-2 sm:gap-4 flex-col sm:flex-row items-left justify-center w-full'>
						<p className='text-sm font-light text-gray-400'>Votes for: {yesVotes}</p>
						<p className='text-sm font-light text-gray-400'>Votes against: {votes ? votes?.length - yesVotes : 0}</p>
					</div>
				</div>

				{/* <button
					onClick={() => onDelete(restaurantId)}
					className='p-2 rounded-full bg-red-500 hover:bg-red-800 transition absolute bottom-4 right-4'
				>
					<BiTrash size={16} />
				</button> */}
			</div>
		</div>
	);
};
