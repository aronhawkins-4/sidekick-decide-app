'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface RestaurantFormProps {
	userId: string;
	userName: string;
}

export const RestaurantForm: React.FC<RestaurantFormProps> = ({ userId, userName }) => {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			createdById: userId,
			createdByName: userName,
			// logo: logoSrc || '/public/placeholder.jpg'
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		if (resName === '') {
			toast.error('Restaurant name cannot be blank');
			setIsLoading(false);
			return;
		}

		setValue('name', '', { shouldValidate: true });
		axios
			.post('/api/restaurants', data)
			.then(() => {
				toast.success('Restaurant created!');
				router.refresh();
			})
			.catch((error) => toast.error('Something went wrong'))
			.finally(() => setIsLoading(false));
	};

	const resName = watch('name');
	// const logoSrc = watch('logo');

	return (
		<div className=' bg-white border max-w-xl w-full border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
			<div className='p-5 w-full'>
				<h2 className='text-xl font-semibold mb-2'>Add a restaurant</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex items-start gap-2 lg:gap-4 w-full flex-col'
				>
					<div className='flex flex-col gap-2 w-full'>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-900 dark:text-gray-400'
						>
							Restaurant name
						</label>
						<input
							type='text'
							id='name'
							{...register('name')}
							autoComplete='name'
							className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
								isLoading && 'opacity-50'
							}`}
						/>
					</div>
					<button
						type='submit'
						className={`relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white group-focus:from-cyan-500 focus:to-blue-500 group-focus:text-white  ${
							isLoading && 'opacity-50'
						}`}
					>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 group-focus:bg-opacity-0'>
							Create Restaurant
						</span>
					</button>
				</form>
			</div>
		</div>
	);
};
