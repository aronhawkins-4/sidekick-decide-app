import prisma from '@/app/libs/prismadb';

const getVotes = async () => {
	try {
		const votes = await prisma.vote.findMany();
		return votes;
	} catch (error: any) {
		return [];
	}
};

export default getVotes;
