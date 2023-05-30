import { Members } from 'pusher-js';
import { pusherClient } from '../libs/pusher';
import { useEffect, useState } from 'react';

const useUserCount = () => {
	const [activeMembers, setActiveMembers] = useState(0);

	useEffect(() => {
		let channel = pusherClient.subscribe('presence-users');
		channel.bind('pusher:subscription_succeeded', (members: Members) => {
			setActiveMembers(members.count);
		});
		channel.bind('pusher:member_added', () => {
			setActiveMembers((current) => current + 1);
		});
		channel.bind('pusher:member_removed', () => {
			setActiveMembers((current) => current - 1);
		});
		return () => {
			pusherClient.unsubscribe('presence-users');
		};
	}, []);

	return { activeMembers };
};

export default useUserCount;
