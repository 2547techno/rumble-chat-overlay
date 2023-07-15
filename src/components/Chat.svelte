<script lang="ts">
	import { PUBLIC_API } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	import { MessageList, type Message, type Emote } from '../lib/chat';
	import MessageCard from './MessageCard.svelte';

	let sse: EventSource | undefined;
	export let sid: number;
	export let removeProfilePicture = false;

	let messageList: MessageList | undefined = new MessageList(0);
	let messages: Message[] = [];
	let emotes: Emote[] = [];

	function createEventSource() {
		const source = new EventSource(new URL(`/events/chat/${sid}`, PUBLIC_API));
		messageList = new MessageList(50);

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

<div id="messages">
	{#each messages as message}
		<MessageCard {message} {emotes} {removeProfilePicture} />
	{/each}
</div>

<style scoped lang="scss">
	#messages {
		overflow-y: hidden;
		height: 98vh;
		display: flex;
		flex-direction: column-reverse;
	}
</style>
