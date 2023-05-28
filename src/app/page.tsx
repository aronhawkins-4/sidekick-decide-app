import { currentUser } from '@clerk/nextjs';
import { RestaurantForm } from './components/RestaurantForm';
import { RestaurantList } from './components/RestaurantList';
import getRestaurants from './actions/getRestaurants';
import getVotes from './actions/getVotes';

export default async function Home() {
	const user = await currentUser();
	const restaurants = await getRestaurants();
	const votes = await getVotes();

	if (!user) {
		return <div>Please Login</div>;
	}
	return (
		<main className='flex min-h-screen flex-col p-24'>
			{restaurants && (
				<div>
					<RestaurantList
						restaurants={restaurants}
						userId={user.id}
					/>
				</div>
			)}

			<div className='w-full h-full flex items-center justify-center flex-grow mt-6'>
				<RestaurantForm
					userId={user.id}
					userName={`${user.firstName} ${user.lastName}`}
				/>
			</div>
		</main>
	);
}
