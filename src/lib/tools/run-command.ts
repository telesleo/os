import listFilesDirectories from './commands/list-files-directories';

const commandList = [listFilesDirectories];

const commands: { [key: string]: (args: { _: string[] }) => string } = {};

commandList.forEach((command) => {
	commands[command.key] = command.run;
});

export function runCommand(args: { _: string[] }): string {
	const command = args._[0];

	if (command && Object.keys(commands).includes(command)) {
		return commands[command](args);
	}

	return '';
}
