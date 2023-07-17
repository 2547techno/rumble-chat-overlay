<script lang="ts">
	import { goto } from '$app/navigation';

	let channel = '';
	let video = '';
	let user = '';
	let removeProfile = true;
	let maxMessages = 40;

	$: c = channel.trim();
	$: v = video.trim();
	$: u = user.trim();

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

	function goToUser() {
		if (u === '') return;
		const params = new URLSearchParams();
		if (removeProfile) {
			params.append('removeProfile', '1');
		}
		if (maxMessages) {
			params.append('maxMessages', String(maxMessages));
		}
		goto(`/overlay/u/${u}?${params.toString()}`);
	}

	function handleKeyPress(e: KeyboardEvent, callback: () => void) {
		if (e.key === 'Enter') {
			callback();
		}
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
		<div class="input-title">Video ID (or video path)</div>
		<div class="input-subtitle">(most reliable method)</div>
		<div class="input">
			<input
				on:keypress={(e) => handleKeyPress(e, goToVideo)}
				bind:value={video}
				type="text"
				name="video-input"
				placeholder="ex. v1heynx"
			/>
			<button on:click={goToVideo}>→</button>
		</div>
	</div>

	<h4 style="margin: 25px 0 0 0;">OR</h4>

	<div class="input-container">
		<div class="input-title">Channel</div>
		<div class="input">
			<input
				on:keypress={(e) => handleKeyPress(e, goToChannel)}
				bind:value={channel}
				type="text"
				name="channel-input"
				placeholder="ex. LofiGirl"
			/>
			<button on:click={goToChannel}>→</button>
		</div>
		<div class="note-container">
			<h4>Note:</h4>
			<p>
				Rumble may take some time to switch to the correct stream.
				<strong
					>If you recently started/restarted your stream this method may take a while to work.</strong
				>
				Double check that <u>https://rumble.com/c/[yourchannel]/live</u> points to the correct stream.
			</p>
		</div>
	</div>

	<h4 style="margin: 25px 0 0 0;">OR</h4>

	<div class="input-container">
		<div class="input-title">User</div>
		<div class="input">
			<input
				on:keypress={(e) => handleKeyPress(e, goToUser)}
				bind:value={user}
				type="text"
				name="user-input"
				placeholder="ex. LofiGirl"
			/>
			<button on:click={goToUser}>→</button>
		</div>
		<div class="note-container">
			<h4>Note:</h4>
			<p>
				Rumble may take some time to switch to the correct stream.
				<strong
					>If you recently started/restarted your stream this method may take a while to work.</strong
				>
				Double check that <u>https://rumble.com/user/[username]/live</u> points to the correct stream.
			</p>
		</div>
	</div>
</div>

<style scoped lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');

	#page {
		padding-bottom: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgb(125, 125, 125);
		color: black;
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
		padding: 60px 30px 60px 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 500px;
		border: rgba(0, 0, 0, 0.2) solid 2px;
		border-radius: 5px;

		.input-title {
			margin-bottom: 10px;
			font-size: x-large;
		}

		.input-subtitle {
			color: rgb(0, 163, 0);
			text-shadow: 0px 0px 15px black;
			margin-bottom: 5px;
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

	.note-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 15px;

		h4 {
			margin: 0px;
			color: rgb(155, 0, 0);
		}

		p {
			margin: 5px;
		}
	}
</style>
