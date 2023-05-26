import prisma from '@/app/libs/prismadb';

const getRestaurants = async () => {
	try {
		const restaurants = await prisma.restaurant.findMany({
			include: {
				votes: true,
			},
		});
		return restaurants;
	} catch (error: any) {
		return [];
	}
};

export default getRestaurants;
