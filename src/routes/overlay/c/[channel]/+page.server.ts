import type { PageServerLoad } from './$types';
import { PUBLIC_API } from '$env/static/public';

export const load = (async ({ params, url }) => {
	const res = await fetch(new URL(`/chat/channel/${params.channel}`, PUBLIC_API));
	const json = await res.json();

	return {
		channel: params.channel,
		sid: json.streamId,
		removeProfile: url.searchParams.has('removeProfile')
	};
}) satisfies PageServerLoad;
