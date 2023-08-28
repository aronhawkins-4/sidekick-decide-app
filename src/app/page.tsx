import { currentUser } from '@clerk/nextjs';
import { RestaurantList } from './components/RestaurantList';

export default async function Home() {
	const user = await currentUser();
	if (!user) {
		return <div>Please Login</div>;
	}
	return (
		<main className='flex min-h-screen flex-col p-8 md:p-24'>
			<div className='w-full h-full flex items-center justify-center flex-grow mt-6'>
				<RestaurantList userId={user.id} />
			</div>
		</main>
	);
}
