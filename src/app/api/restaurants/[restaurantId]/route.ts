import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { currentUser } from '@clerk/nextjs';
import { pusherServer } from '@/app/libs/pusher';

interface IParams {
	restaurantId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	try {
		const user = await currentUser();
		if (!user?.id) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const { restaurantId } = params;
		if (!restaurantId || typeof restaurantId !== 'string') {
			throw new Error('Invalid ID');
		}

		const restaurant = await prisma.restaurant.delete({
			where: {
				id: restaurantId,
			},
		});

		await pusherServer.trigger('restaurants-list', 'restaurant:remove', restaurant);

		return NextResponse.json(restaurant);
	} catch (error: any) {
		console.log('ERROR_RESTAURANT_DELETE', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
