import { UserButton } from '@clerk/nextjs';

export const Header = () => {
	return (
		<div className='z-10 w-full font-mono text-sm fixed top-0 left-0 py-6 px-8 lg:px-24'>
			<div className='flex mx-w-5xl items-center justify-end'>
				<UserButton
					afterSignOutUrl='/'
					appearance={{
						elements: {
							avatarBox: 'w-12 h-12',
						},
					}}
				/>
			</div>
		</div>
	);
};
