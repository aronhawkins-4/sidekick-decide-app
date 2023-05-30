'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Vote } from '@prisma/client';
import { useState } from 'react';

interface VoteFormProps {
	userId: string;
	restaurantId: string;
	onVote: (userVoteId: string) => void;
	onClick: () => void;
	setIsDisabled: (disabled: boolean) => void;
}
export const VoteForm: React.FC<VoteFormProps> = ({ userId, restaurantId, onVote, onClick, setIsDisabled }) => {
	const router = useRouter();

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

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue('vote', false, { shouldValidate: true });
		setIsDisabled(true);
		axios
			.post('/api/vote/', data)
			.then((response) => {
				toast.success(`You voted ${data.vote === true ? 'Yes' : 'No'}`);
				onVote(response.data.id as string);
				router.refresh();
			})
			.catch((error) => toast.error(error))
			.finally(() => setIsDisabled(false));
	};

	return (
		<div className='max-w-sm dark:bg-gray-800 dark:border-gray-700'>
			<div className=''>
				<form
					onSubmit={() => {
						handleSubmit(onSubmit)();
						onClick();
					}}
					className='flex flex-col items-center gap-2 lg:gap-4 w-full'
				>
					<div className='flex gap-2 items-center justify-between'>
						<button
							type='submit'
							name='true'
							onClick={() => {
								setValue('vote', true);
							}}
							className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'
						>
							<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>Vote Yes</span>
						</button>
						<button
							type='submit'
							name='false'
							onClick={() => {
								setValue('vote', false);
							}}
							className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'
						>
							<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>Vote No</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
