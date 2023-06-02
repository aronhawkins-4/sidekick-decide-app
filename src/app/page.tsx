import { currentUser } from '@clerk/nextjs';
import { RestaurantForm } from './components/RestaurantForm';
import { RestaurantList } from './components/RestaurantList';
import getRestaurants from './actions/getRestaurants';
import getVotes from './actions/getVotes';
import { UserCount } from './components/UserCount';
import { RestaurantCard } from './components/RestaurantCard';
import { LocationForm } from './components/LocationForm';
import { IParams } from './actions/getGoogleRestaurants';

import getGoogleRestaurants from './actions/getGoogleRestaurants';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: IParams }) {
	const user = await currentUser();
	// const restaurants = await getRestaurants();

	// const gRes = await getGoogleRestaurants(searchParams);
	if (!user) {
		return <div>Please Login</div>;
	}
	return (
		<main className='flex min-h-screen flex-col p-24'>
			<div className='w-full h-full flex items-center justify-center flex-grow mt-6'>
				{/* <RestaurantForm
					userId={user.id}
					userName={`${user.firstName} ${user.lastName}`}
				/> */}
				<RestaurantList userId={user.id} />
			</div>
			{/* <UserCount restaurantList={restaurants} /> */}
			{/* <ul>
				{gRes.map((res) => (
					<li key={res.place_id}>{res.name}</li>
				))}
			</ul> */}
		</main>
	);
}
