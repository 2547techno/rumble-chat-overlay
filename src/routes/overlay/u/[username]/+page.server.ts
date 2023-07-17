import type { PageServerLoad } from './$types';
import { PUBLIC_API } from '$env/static/public';

export const load = (async ({ params, url }) => {
	const res = await fetch(new URL(`/chat/user/${params.username}`, PUBLIC_API));
	let sid = 0;
	let error;
	if (!res.ok) {
		error = {
			message: 'Invalid User!'
		};
	} else {
		const json = await res.json();
		sid = json.streamId;
	}

	return {
		error,
		channel: params.username,
		sid,
		removeProfile: url.searchParams.has('removeProfile'),
		maxMessages: Number(url.searchParams.get('maxMessages') ?? 40)
	};
}) satisfies PageServerLoad;
