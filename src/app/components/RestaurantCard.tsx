'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VoteForm } from './VoteForm';
import { Vote } from '@prisma/client';
import { BiTrash } from 'react-icons/bi';
import { pusherClient } from '@/app/libs/pusher';
import { useEffect, useMemo } from 'react';
import { ChangeVoteButton } from './ChangeVoteButton';
import useUserCount from '../hooks/useUserCount';
import { AgreeModal } from './AgreeModal';

interface RestaurantCardProps {
	name: string;
	restaurantId: string;
	createdByName: string;
	initialVotes: Vote[];
	userId: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, restaurantId, userId, createdByName, initialVotes }) => {
	const router = useRouter();

	const [deletingId, setDeletingId] = useState('');
	const [votes, setVotes] = useState(initialVotes);
	const [yesVotes, setYesVotes] = useState((initialVotes || []).filter((vote) => vote.vote === true).length);
	const [noVotes, setNoVotes] = useState((initialVotes || []).filter((vote) => vote.vote === false).length);
	const [hasUserVoted, setHasUserVoted] = useState((initialVotes || []).filter((vote) => vote?.userId === userId).length > 0);
	const [voteId, setVoteId] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	// const [agreedRestaurantName, setAgreedRestaurantName] = useState('');
	// const [isAgreedModalOpen, setIsAgreedModalOpen] = useState(false);

	// const { activeMembers } = useUserCount();

	useEffect(() => {
		pusherClient.subscribe(restaurantId);

		const voteRemoveHandler = (vote: Vote) => {
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
			} else {
				setNoVotes((current) => {
					if (vote.restaurantId === restaurantId) {
						return current - 1;
					}
					return current;
				});
			}

			return vote;
		};

		const voteAddHandler = (vote: Vote) => {
			setVotes((current) => {
				if (current) {
					if (vote.restaurantId === restaurantId) {
						return [...current, vote];
					}
					return current;
				}
				return [];
			});
			if (vote.vote === true) {
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

			// if (yesVotes === activeMembers) {
			// 	setAgreedRestaurantName(name);
			// 	setIsAgreedModalOpen(true);
			// }
			return vote;
		};

		pusherClient.bind('vote:new', voteAddHandler);
		pusherClient.bind('vote:remove', voteRemoveHandler);

		return () => {
			pusherClient.unsubscribe(restaurantId);
			pusherClient.unbind('vote:new', voteAddHandler);
			pusherClient.unbind('vote:remove', voteRemoveHandler);
		};
	}, [restaurantId, hasUserVoted, userId, votes, noVotes, yesVotes]);

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
		<>
			{/* {isAgreedModalOpen && (
				<AgreeModal
					restaurantName={agreedRestaurantName}
					isOpen={isAgreedModalOpen}
					setIsOpen={setIsAgreedModalOpen}
				/>
			)} */}

			<div
				className={`w-full lg:min-w-[20rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${deletingId === restaurantId && 'opacity-80'} ${
					isDisabled && 'opacity-80 pointer-events-none'
				}`}
			>
				<div className='flex flex-col items-center p-10 relative gap-4'>
					<h5 className='text-xl font-medium text-gray-900 dark:text-white'>{name}</h5>
					{!hasUserVoted && (
						<VoteForm
							userId={userId}
							restaurantId={restaurantId}
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
					)}
					<div className='flex flex-col gap-1 items-center justify-center'>
						<p className='text-sm font-light text-gray-400'>Created by: {createdByName}</p>
						<div className='flex gap-2 sm:gap-4 flex-col sm:flex-row items-left justify-center w-full'>
							<p className='text-sm font-light text-gray-400'>Votes for: {yesVotes}</p>
							<p className='text-sm font-light text-gray-400'>Votes against: {noVotes}</p>
						</div>
					</div>

					<button
						onClick={() => onDelete(restaurantId)}
						className='p-2 rounded-full bg-red-500 hover:bg-red-800 transition absolute bottom-4 right-4'
					>
						<BiTrash size={16} />
					</button>
				</div>
			</div>
		</>
	);
};
