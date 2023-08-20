'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { useRef } from 'react';

interface LocationFormProps {
	setQueryString: (queryString: string) => void;
	isLoading: boolean;
	// nextPageToken?: string;
}
export const LocationForm: React.FC<LocationFormProps> = ({ setQueryString, isLoading }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			state: '',
			city: '',
			placeId: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue('state', '', { shouldValidate: true });
		setValue('city', '', { shouldValidate: true });
		setValue('placeId', '', { shouldValidate: true });
		if (data.state === '' || data.city === '' || data.placeId === '') {
			toast.error('Place cannot be blank');
			return;
		}
		setQueryString(`${data.city}+${data.state}`);
		if (inputRef && inputRef.current) {
			inputRef.current.value = '';
		}
	};

	return (
		<div className={`bg-white border max-w-xl w-full border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${isLoading && 'opacity-50'}`}>
			<div className='p-5 w-full'>
				<h2 className='text-xl font-semibold mb-2'>Choose a location</h2>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-2 items-center justify-stretch w-full'
				>
					<ReactGoogleAutocomplete
						apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
						onPlaceSelected={(place) => {
							setValue('state', place.address_components[2].short_name);
							setValue('city', place.address_components[0].short_name);
							setValue('placeId', place.place_id);
						}}
						ref={inputRef}
						className='bg-gray-700 p-2 text-slate-200 text-lg rounded-lg w-full'
					/>
					<button
						type='submit'
						className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-full'
					>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full'>Submit</span>
					</button>
				</form>
			</div>
		</div>
	);
};

/* <form
					onSubmit={handleSubmit(onSubmit)}
					className='flex items-start gap-2 lg:gap-4 w-full flex-col'
				> */

/* <div className='flex flex-col gap-2 w-full'>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-900 dark:text-gray-400'
						>
							City name
						</label>
						<input
							type='text'
							id='location'
							{...register('location')}
							autoComplete='location'
							className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
								isLoading && 'opacity-50'
							}`}
						/>
					</div> */

/* <div className='flex gap-4 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<label
								htmlFor='states'
								className='block text-sm font-medium text-gray-900 dark:text-gray-400'
							>
								State
							</label>
							<Select
								options={stateOptions}
								id='states'
								isClearable
								instanceId='states'
								onChange={(value) => {
									if (value) {
										setValue('state', value?.value);
										setStateCode(value?.value);
									}
								}}
								styles={{
									control: (baseStyles, state) => ({
										...baseStyles,
										backgroundColor: '#374151',
										borderColor: 'rgb(75, 85, 99)',
									}),
									input: (baseStyles, state) => ({
										...baseStyles,
										color: '#FFFFFF',
									}),
									singleValue: (baseStyles, state) => ({
										...baseStyles,
										color: '#FFFFFF',
									}),
									option: (baseStyles, state) => ({
										...baseStyles,
										backgroundColor: '#374151',
										borderColor: 'rgb(75, 85, 99)',
									}),
									menu: (baseStyles, state) => ({
										...baseStyles,
										backgroundColor: '#000000',
									}),
								}}
								classNames={{
									option: () => 'hover:opacity-80 transition',
								}}
							/>
						</div>
						{cityOptions.length > 0 && (
							<div className='flex flex-col gap-2 w-full'>
								<label
									htmlFor='cities'
									className='block text-sm font-medium text-gray-900 dark:text-gray-400'
								>
									City
								</label>
								<Select
									options={cityOptions}
									id='cities'
									isClearable
									instanceId='cities'
									onChange={(value) => setValue('city', value?.value)}
									styles={{
										control: (baseStyles, state) => ({
											...baseStyles,
											backgroundColor: '#374151',
											borderColor: 'rgb(75, 85, 99)',
										}),
										input: (baseStyles, state) => ({
											...baseStyles,
											color: '#FFFFFF',
										}),
										singleValue: (baseStyles, state) => ({
											...baseStyles,
											color: '#FFFFFF',
										}),
										option: (baseStyles, state) => ({
											...baseStyles,
											backgroundColor: '#374151',
											borderColor: 'rgb(75, 85, 99)',
										}),
										menu: (baseStyles, state) => ({
											...baseStyles,
											backgroundColor: '#000000',
										}),
									}}
									classNames={{
										option: () => 'hover:opacity-80 transition',
									}}
								/>
							</div>
						)}
					</div>
					<button
						type='submit'
						className={`relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white group-focus:from-cyan-500 focus:to-blue-500 group-focus:text-white `}
					>
						<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 group-focus:bg-opacity-0'>Search</span>
					</button>
				</form> */

/* <Autocomplete
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
					onPlaceSelected={(place) => {
						console.log(place);
					}}
					
				/> */
