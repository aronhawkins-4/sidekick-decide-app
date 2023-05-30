'use client';

import { Channel, Members } from 'pusher-js';
import { pusherClient } from '../libs/pusher';
import { useEffect, useState } from 'react';
import useUserCount from '../hooks/useUserCount';

export const UserCount = () => {
	const { activeMembers } = useUserCount();
	return (
		<div className='w-full flex justify-center mt-6'>
			<p className='text-lg font-medium text-gray-500'>Active Users: {activeMembers}</p>
		</div>
	);
};
