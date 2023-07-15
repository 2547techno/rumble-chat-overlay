import type { PageServerLoad } from './$types';
import { PUBLIC_API } from '$env/static/public';

export const load = (async ({ params }) => {
	const id = params.id.split('-')[0];
	const res = await fetch(new URL(`/chat/${id}`, PUBLIC_API));
	const json = await res.json();

	return {
		id,
		sid: json.streamId
	};
}) satisfies PageServerLoad;
