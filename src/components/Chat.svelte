<script lang="ts">
	import { PUBLIC_API } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	import { MessageList, type Message, type Emote } from '../lib/chat';
	import MessageCard from './MessageCard.svelte';

	let sse: EventSource | undefined;
	export let sid: number;
	export let removeProfilePicture = false;
	export let maxMessages: number;

	let messageList: MessageList | undefined = new MessageList(0);
	let messages: Message[] = [];
	let emotes: Emote[] = [];
	const url = new URL(`/events/chat/${sid}`, PUBLIC_API);
	let error: { message: string } | undefined;

	function createEventSource() {
		const source = new EventSource(url);
		messageList = new MessageList(maxMessages);

		source.addEventListener('message', (msg) => {
			const data: Message[] = JSON.parse(msg.data);
			messageList?.add(data);
			messages = ([] as Message[]).concat(messageList?.messages ?? []).reverse();
		});

		return source;
	}

	async function getEmotes() {
		const res = await fetch(new URL(`/emotes/${sid}`, PUBLIC_API));
		if (!res.ok) return [];

		const data = await res.json();
		return data as Emote[];
	}

	onMount(async () => {
		const res = await fetch(url);
		if (!res.ok) {
			error = {
				message: 'Stream Is Not Live!'
			};
			return;
		}

		emotes = await getEmotes();
		sse = createEventSource();
	});

	onDestroy(() => {
		if (sse) {
			sse.close();
			sse = undefined;
		}
	});
</script>

{#if error}
	<h1>{error.message}</h1>
{:else}
	<div id="messages">
		{#each messages as message}
			<MessageCard {message} {emotes} {removeProfilePicture} />
		{/each}
	</div>
{/if}

<style scoped lang="scss">
	#messages {
		overflow: hidden;
		height: 95vh;
		padding: 10px;
		display: flex;
		flex-direction: column-reverse;
	}
</style>
