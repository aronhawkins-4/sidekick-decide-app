'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Vote } from '@prisma/client';
import { useState } from 'react';
import { BsCheck2, BsCheck2Circle } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useQuery, useMutation } from '@tanstack/react-query';

interface VoteFormProps {
	userId: string;
	restaurantId?: string;
	setIsDisabled: (disabled: boolean) => void;
}
export const VoteForm: React.FC<VoteFormProps> = ({ userId, restaurantId, setIsDisabled }) => {
	const [hasUserVoted, setHasUserVoted] = useState(false);

	const {
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			vote: false,
			userId: userId,
			restaurantId: restaurantId,
		},
	});

	const createVote = useMutation({
		mutationFn: (fieldData: FieldValues) => {
			return axios
				.post('/api/vote/', fieldData)
				.then((response) => {
					toast.success(`You voted ${response.data.vote === true ? 'Yes' : 'No'}`);
					setHasUserVoted(true);
				})
				.catch((error) => {
					toast.error('Something went wrong');
					console.log(error);
				});
		},
	});

	// const createRestaurant = useMutation({
	// 	mutationFn: ({ restaurantId, voteId }: { restaurantId: string | undefined; voteId: string }) => {
	// 		return axios
	// 			.post('/api/restaurants/', {
	// 				restaurantId,
	// 				voteId,
	// 			})
	// 			.then((response) => {})
	// 			.catch(() => console.log('ERROR: Something went wrong when creating a new restaurant'));
	// 	},
	// });
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const newVote = createVote.mutate(data);
	};

	return (
		<div className='max-w-sm dark:bg-gray-800 dark:border-gray-700'>
			<div className=''>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(onSubmit)();
					}}
					className='flex flex-col items-center gap-2 lg:gap-4 w-full mt-4'
				>
					<div className='flex gap-2 items-center justify-end w-full'>
						<button
							type='submit'
							name='true'
							onClick={() => {
								setValue('vote', true);
							}}
							className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'
						>
							<span className='relative px-1.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0'>
								<BsCheck2 size={18} />
							</span>
						</button>
						<button
							type='submit'
							name='false'
							onClick={() => {
								setValue('vote', false);
							}}
							className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'
						>
							<span className='relative px-1.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0'>
								<RxCross2 size={18} />
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
