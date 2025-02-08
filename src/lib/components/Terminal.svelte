<script lang="ts">
	import parseCommand from '$lib/tools/parse-command';

	let command = $state('');

	let history = $state<string[]>([]);

	function clear() {
		history = [];
	}

	function runCommand() {
		const parsedCommand = parseCommand(command);

		if (parsedCommand._.length && parsedCommand._[0] === 'clear') {
			clear();
		} else {
			history.push(JSON.stringify(parsedCommand));
		}

		command = '';
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			runCommand();
		}
	}
</script>

<ul>
	{#each history as historyPiece}
		<li>{historyPiece}</li>
	{/each}
</ul>
<input type="text" {onkeydown} bind:value={command} />
