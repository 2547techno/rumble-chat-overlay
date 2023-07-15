import type { PageServerLoad } from './$types';
import { PUBLIC_API } from '$env/static/public';

export const load = (async ({ params, url }) => {
	const id = params.id.split('-')[0];
	const res = await fetch(new URL(`/chat/${id}`, PUBLIC_API));
	let sid = 0;
	let error;
	if (!res.ok) {
		error = {
			message: 'Invalid Video ID!'
		};
	} else {
		const json = await res.json();
		sid = json.streamId;
	}

	return {
		error,
		id,
		sid,
		removeProfile: url.searchParams.has('removeProfile'),
		maxMessages: Number(url.searchParams.get('maxMessages') ?? 40)
	};
}) satisfies PageServerLoad;
