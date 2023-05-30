import { NextApiRequest, NextApiResponse } from 'next';
import { pusherServer } from '@/app/libs/pusher';
import { getAuth } from '@clerk/nextjs/dist/server-helpers.server';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const { userId } = getAuth(request);
	if (!userId) {
		return response.status(401);
	}

	const socketId = request.body.socket_id;
	const channel = request.body.channel_name;
	const data = {
		user_id: userId,
	};

	const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
	return response.send(authResponse);
}
