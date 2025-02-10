import type CommandArgs from '$lib/base/command-args';
import listFilesDirectoriesCommand from './commands/list-files-directories';
import createDirectoryCommand from './commands/create-directory';

const commandList = [listFilesDirectoriesCommand, createDirectoryCommand];

const commands: { [key: string]: (args: CommandArgs, path: string) => string } = {};

commandList.forEach((command) => {
	commands[command.key] = command.run;
});

export function runCommand(args: CommandArgs, path: string): string {
	const command = args._[0];

	if (command && Object.keys(commands).includes(command)) {
		return commands[command](args, path);
	}

	return '';
}
