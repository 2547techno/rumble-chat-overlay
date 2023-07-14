<script lang="ts">
	import type { Message } from '../lib/chat';

	export let message: Message;
	export let showProfilePicture = true;
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
		{message.text}
	</p>
</div>

<style scoped lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
	.message {
		// border: blue solid 1px;
		margin: 3px;
		display: flex;
		min-height: 25px;
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
