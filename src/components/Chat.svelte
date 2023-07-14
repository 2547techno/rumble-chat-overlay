<script lang="ts">
	import { PUBLIC_API } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	import { MessageList, type Message } from '../lib/chat';
	import MessageCard from './MessageCard.svelte';

	let sse: EventSource | undefined;
	export let sid: number;

	let messageList: MessageList | undefined = new MessageList(0);
	let messages: Message[] = [];

	onMount(() => {
		const source = new EventSource(new URL(`/events/chat/${sid}`, PUBLIC_API));
		messageList = new MessageList(20);

		source.addEventListener('message', (msg) => {
			const data: Message[] = JSON.parse(msg.data);
			messageList?.add(data);
			messages = messageList?.messages ?? [];
		});

		sse = source;
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
		<MessageCard {message} />
	{/each}
</div>

<style scoped lang="scss">
	#messages {
		// border: red solid 1px;
		height: 100vh;
	}
</style>
