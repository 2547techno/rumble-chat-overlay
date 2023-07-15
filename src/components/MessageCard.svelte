<script lang="ts">
	import type { Emote, Message } from '../lib/chat';

	export let message: Message;
	export let showProfilePicture = true;
	export let emotes: Emote[];

	let messageHTML = '';

	function createEmoteElement(word: string): HTMLImageElement | undefined {
		const emote = emotes.find((e) => e.name === word);
		if (!emote) return;

		const img = document.createElement('img');
		img.src = emote.file;
		img.height = 25;

		return img;
	}

	$: {
		// insert emotes
		const words = message.text.split(' ');
		const elems: (HTMLSpanElement | HTMLImageElement)[] = [];
		elems.push(document.createElement('span'));
		for (let i = 0; i < words.length; i++) {
			const word = words[i];
			if (word.startsWith(':') && word.endsWith(':')) {
				const emoteElem = createEmoteElement(word.slice(1, word.length - 1));
				if (emoteElem) {
					elems.push(emoteElem);
					const span = document.createElement('span');
					span.innerText = ' ';
					elems.push(span);
				} else {
					elems[elems.length - 1].innerText += `${word} `;
				}
			} else {
				elems[elems.length - 1].innerText += `${word} `;
			}
		}

		messageHTML = '';
		elems.forEach((elem) => {
			messageHTML += elem.outerHTML;
		});
	}
</script>

<div class="message">
	{#if showProfilePicture}
		{#if message.from.profilePicture}
			<div class="pfp">
				<img src={message.from.profilePicture} alt={message.from.username} />
			</div>
		{/if}
	{/if}

	<p class="text">
		<span class="username" style={`color: ${message.from.color}`}>
			<strong>{message.from.username}</strong>
		</span>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html messageHTML}
	</p>
</div>

<style scoped lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
	.message {
		margin: 3px;
		display: flex;
		font-family: 'Poppins', sans-serif;

		p {
			margin: 0;
			padding: 0;
		}

		.pfp {
			height: 25px;
			margin-right: 5px;

			img {
				height: 100%;
				clip-path: circle(calc(25px / 2) at center);
			}
		}

		.username {
			margin-right: 5px;
		}
	}
</style>
