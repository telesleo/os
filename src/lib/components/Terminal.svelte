<script lang="ts">
	import { parseCommand } from '$lib/tools/parse-command';
	import { runCommand } from '$lib/tools/run-command';

	let command = $state('');

	let history = $state<string[]>([]);

	function clear() {
		history = [];
	}

	function handleCommand() {
		const parsedCommand = parseCommand(command);

		if (parsedCommand._.length && parsedCommand._[0] === 'clear') {
			clear();
		} else {
			history.push(runCommand(parsedCommand));
		}

		command = '';
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleCommand();
		}
	}
</script>

<ul>
	{#each history as historyPiece}
		<li>{historyPiece}</li>
	{/each}
</ul>
<input type="text" {onkeydown} bind:value={command} />
