<script lang="ts">
	import run from '$lib/tools/command.ts';

	let command = $state('');

	let history = $state([]);

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			history.push(run(command));
			command = '';
		}
	}
</script>

<ul>
	{#each history as historyPiece}
		<li>{historyPiece}</li>
	{/each}
</ul>
<input type="text" {onkeydown} bind:value={command} />
