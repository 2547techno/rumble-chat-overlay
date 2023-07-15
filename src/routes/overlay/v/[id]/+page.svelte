<script lang="ts">
	import Chat from '../../../../components/Chat.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.error}
	<h1>
		{data.error.message}
	</h1>
{:else}
	<Chat sid={data.sid} removeProfilePicture={data.removeProfile} />
{/if}
