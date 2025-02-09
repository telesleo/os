<script lang="ts">
	import { parseCommand } from '$lib/tools/parse-command';
	import { runCommand } from '$lib/tools/run-command';

	let command = $state('');

	let history = $state<string[]>([]);

	let path = $state('/');

	function clear() {
		history = [];
	}

	function showPath() {
		history.push(path);
	}

	function handleCommand() {
		const parsedCommand = parseCommand(command);

		if (parsedCommand._.length > 0) {
			switch (parsedCommand._[0]) {
				case 'clear':
					clear();
					break;
				case 'path':
					showPath();
					break;
				default:
					history.push(runCommand(parsedCommand, path));
			}
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
