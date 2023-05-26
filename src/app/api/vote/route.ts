import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/libs/pusher';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { userId, vote, restaurantId } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const newVote = await prisma.vote.create({
			data: {
				userId,
				vote,
				restaurantId,
			},
		});

		await pusherServer.trigger(restaurantId, 'vote:new', newVote);

		return NextResponse.json(newVote);
	} catch (error: any) {
		return new NextResponse('Internal error', { status: 500 });
	}
}
