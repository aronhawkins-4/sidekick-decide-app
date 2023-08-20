import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/libs/pusher';
import axios from 'axios';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { query, userId, page } = body.data;
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const restaurants = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+restaurants&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`);
		const results = restaurants.data.results;
		return NextResponse.json(restaurants.data);
	} catch (error: any) {
		return new NextResponse('Internal error', { status: 500 });
	}
}
