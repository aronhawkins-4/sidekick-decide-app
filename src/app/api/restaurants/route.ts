// import prisma from '@/app/libs/prismadb';
// import { NextResponse } from 'next/server';
// import { pusherServer } from '@/app/libs/pusher';

// export async function POST(request: Request) {
// 	try {
// 		const body = await request.json();
// 		const { name, createdById, createdByName } = body;
// 		if (!name || !createdById || !createdByName) {
// 			return new NextResponse('Unauthorized', { status: 401 });
// 		}

// 		const newRestaurant = await prisma.restaurant.create({
// 			data: {
// 				name,
// 				createdById,
// 				createdByName,
// 			},
// 		});

// 		await pusherServer.trigger('restaurants-list', 'restaurant:new', newRestaurant);
// 		return NextResponse.json(newRestaurant);
// 	} catch (error: any) {
// 		return new NextResponse('Internal error', { status: 500 });
// 	}
// }
