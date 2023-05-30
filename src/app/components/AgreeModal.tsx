'use client';

import { useEffect, useState } from 'react';
import useUserCount from '../hooks/useUserCount';
import { FaHandshake } from 'react-icons/fa';

interface AgreeModalProps {
	restaurantName?: string;
	isOpen?: boolean;
	setIsOpen: (open: boolean) => void;
}

export const AgreeModal: React.FC<AgreeModalProps> = ({ restaurantName, isOpen, setIsOpen }) => {
	return (
		<>
			<div className={`w-screen h-screen fixed bg-gray-800/80 top-0 left-0 z-10 ${!isOpen && 'hidden'} ${isOpen && 'flex'}`}></div>
			<div
				tabIndex={-1}
				className={`fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full w-screen h-screen justify-center items-center z-11 ${!isOpen && 'hidden'} ${
					isOpen && 'flex'
				}`}
			>
				<div className='relative w-full max-w-md max-h-full'>
					<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
						<button
							type='button'
							className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
							data-modal-hide='popup-modal'
							onClick={() => setIsOpen(false)}
						>
							<svg
								aria-hidden='true'
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
									clipRule='evenodd'
								></path>
							</svg>
							<span className='sr-only'>Close modal</span>
						</button>
						<div className='p-6 text-center flex flex-col gap-4'>
							<div className='flex justify-center w-full'>
								<FaHandshake size={42} />
							</div>
							<h3 className='text-lg font-normal text-gray-500 dark:text-gray-400'>All active members agreed on {restaurantName}</h3>
							<div className='flex gap-2 justify-center items-center w-full'>
								<button
									data-modal-hide='popup-modal'
									type='button'
									className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'
									onClick={() => setIsOpen(false)}
								>
									<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0'>Sounds Great!</span>
								</button>
								<button
									data-modal-hide='popup-modal'
									type='button'
									className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'
									onClick={() => setIsOpen(false)}
								>
									<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0'>Keep Voting</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
