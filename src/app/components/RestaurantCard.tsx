'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VoteForm } from './VoteForm';
import useUserCount from '../hooks/useUserCount';
import Image from 'next/image';
import { ChangeVoteButton } from './ChangeVoteButton';

interface RestaurantCardProps {
	name: string;
	address: string;
	rating: string;
	placeId: string;
	photo?: string;
	userId: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, address, rating, placeId, photo, userId }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [hasUserVoted, setHasUserVoted] = useState(false);
	const [voteId, setVoteId] = useState('');

	return (
		<div className={`w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${isDisabled && 'opacity-80 pointer-events-none'}`}>
			<div className='flex flex-col items-start relative'>
				<div className='relative w-full h-40'>
					<Image
						src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`}
						alt='location image'
						fill
						className='object-cover'
					/>
				</div>
				<div className='p-10 w-full'>
					<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{name}</h3>
					<h4 className='text-sm font-light text-gray-400'>{address}</h4>
					<p className='text-sm font-light'>
						rating: <span className='font-bold'>{rating} stars</span>
					</p>
					{!hasUserVoted && (
						<VoteForm
							userId={userId}
							setIsDisabled={setIsDisabled}
							restaurantId={placeId}
							setHasUserVoted={setHasUserVoted}
							setVoteId={setVoteId}
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
				</div>
			</div>
		</div>
	);
};

{
	/* {!hasUserVoted && (
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
				)} */
}
{
	/* <div className='flex flex-col gap-1 items-center justify-center'>
					{/* <p className='text-sm font-light text-gray-400'>Created by: {createdByName}</p> */
}
{
	/* <div className='flex gap-2 sm:gap-4 flex-col sm:flex-row items-left justify-center w-full'>
						<p className='text-sm font-light text-gray-400'>Votes for: {yesVotes}</p>
						<p className='text-sm font-light text-gray-400'>Votes against: {votes ? votes?.length - yesVotes : 0}</p>
					</div> */
}
{
	/* </div>  */
}

{
	/* <button
					onClick={() => onDelete(restaurantId)}
					className='p-2 rounded-full bg-red-500 hover:bg-red-800 transition absolute bottom-4 right-4'
				>
					<BiTrash size={16} />
				</button> */
}
