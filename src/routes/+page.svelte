<script lang="ts">
	import { goto } from '$app/navigation';

	let channel = '';
	let video = '';
	let removeProfile = true;
	let maxMessages = 40;

	$: c = channel.trim();
	$: v = video.trim();

	function goToChannel() {
		if (c === '') return;
		const params = new URLSearchParams();
		if (removeProfile) {
			params.append('removeProfile', '1');
		}
		if (maxMessages) {
			params.append('maxMessages', String(maxMessages));
		}
		goto(`/overlay/c/${c}?${params.toString()}`);
	}

	function goToVideo() {
		if (v === '') return;
		const id = v.split('-')[0];

		const params = new URLSearchParams();
		if (removeProfile) {
			params.append('removeProfile', '1');
		}
		if (maxMessages) {
			params.append('maxMessages', String(maxMessages));
		}
		goto(`/overlay/v/${id}?${params.toString()}`);
	}
</script>

<div id="page">
	<h1>Get Rumble Overlay Link</h1>

	<h3>Options:</h3>
	<div class="options-container">
		<div class="option">
			<label for="remove-profile">Remove Profile Picture: </label>
			<input
				bind:checked={removeProfile}
				type="checkbox"
				name="remove-profile"
				id="remove-profile"
			/>
		</div>
		<div class="option">
			<label for="max-messages">Max Messages: </label>
			<input bind:value={maxMessages} type="number" name="max-messages" id="max-messages" />
		</div>
	</div>

	<div class="input-container">
		<p>Channel</p>
		<div class="input">
			<input bind:value={channel} type="text" name="channel-input" placeholder="ex. LofiGirl" />
			<button on:click={goToChannel}>→</button>
		</div>
	</div>

	<h4 style="margin-top: 20px;">OR</h4>

	<div class="input-container">
		<p>Video ID (or video path)</p>
		<div class="input">
			<input bind:value={video} type="text" name="video-input" placeholder="ex. v1heynx" />
			<button on:click={goToVideo}>→</button>
		</div>
	</div>
</div>

<style scoped lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');

	#page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: rgb(125, 125, 125);
		font-weight: 400;
		font-family: 'Roboto', sans-serif;
	}

	.options-container {
		.option {
			margin-bottom: 10px;
		}

		#max-messages {
			width: 50px;
		}
	}

	.input-container {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			margin-bottom: 5px;
			font-size: large;
		}

		.input {
			display: flex;
			input {
				padding: 5px;
				padding-left: 10px;
				height: 25px;
				width: 250px;
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
				border: none;
			}

			button {
				margin: 0px;
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
				border: none;
				cursor: pointer;
				width: 40px;
			}
		}
	}
</style>
