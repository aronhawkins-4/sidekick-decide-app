import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { currentUser } from '@clerk/nextjs';
import { pusherServer } from '@/app/libs/pusher';

interface IParams {
	voteId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	try {
		const user = await currentUser();
		if (!user?.id) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const { voteId } = params;
		if (!voteId || typeof voteId !== 'string') {
			throw new Error('Invalid ID');
		}

		const existingVote = await prisma.vote.findUnique({
			where: {
				id: voteId,
			},
		});
		if (!existingVote) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		const deletedVote = await prisma.vote.delete({
			where: {
				id: voteId,
			},
		});
		await pusherServer.trigger(deletedVote.restaurantId, 'vote:remove', deletedVote);

		return NextResponse.json(deletedVote);
	} catch (error: any) {
		console.log('ERROR_RESTAURANT_DELETE', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
