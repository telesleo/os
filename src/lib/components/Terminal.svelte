<script lang="ts">
	import { parseCommand } from '$lib/tools/parse-command';
	import { runCommand } from '$lib/tools/run-command';

	let command = $state('');

	let history = $state<string[]>([]);

	let path = $state('/');

	function clear() {
		history = [];
	}

	function setPath(newPath: string) {
		path = newPath;
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
					history.push(runCommand(parsedCommand, path, setPath));
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

<div class="terminal">
	{#if history.length > 0}
		<ul class="terminal-history">
			{#each history as historyPiece}
				<li>{historyPiece}</li>
			{/each}
		</ul>
	{/if}
	<input type="text" {onkeydown} bind:value={command} />
</div>

<style>
	.terminal {
		background-color: black;
		width: 100%;
		height: 100%;
		padding: 15px;
	}

	.terminal-history {
		color: white;
	}
</style>
