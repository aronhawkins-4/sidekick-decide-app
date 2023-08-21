'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface ChangeVoteButtonProps {
	voteId: string;
	onClick: () => void;
	setIsDisabled: (disabled: boolean) => void;
}

export const ChangeVoteButton: React.FC<ChangeVoteButtonProps> = ({ voteId, onClick, setIsDisabled }) => {
	const onDelete = useCallback(async () => {
		setIsDisabled(true);
		axios
			.delete(`/api/vote/${voteId}`)
			.then(() => {
				toast.success('Vote Removed!');
			})
			.catch((error) => {
				console.log(error);
				toast.error('error');
			})
			.finally(() => setIsDisabled(false));
	}, [voteId, setIsDisabled]);

	return (
		<div className='mt-4'>
			<button
				type='submit'
				onClick={() => {
					onClick();
					onDelete();
				}}
				className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'
			>
				<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>Change Vote</span>
			</button>
		</div>
	);
};
