<script lang="ts">
	import Chat from '../../../../components/Chat.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Chat sid={data.sid} removeProfilePicture={data.removeProfile} />
