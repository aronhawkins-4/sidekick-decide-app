import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/libs/pusher';
import axios from 'axios';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		console.log(body);
		const { query, userId } = body.data;
		console.log(query);
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const restaurants = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+restaurants&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`);

		return NextResponse.json(restaurants.data.results);
	} catch (error: any) {
		return new NextResponse('Internal error', { status: 500 });
	}
}
