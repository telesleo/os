import type CommandArgs from '$lib/base/command-args';
import listFilesDirectoriesCommand from './commands/list-files-directories';
import createDirectoryCommand from './commands/create-directory';
import accessDirectory from './commands/access-directory';

const commandList = [listFilesDirectoriesCommand, createDirectoryCommand, accessDirectory];

const commands: {
	[key: string]: (args: CommandArgs, path: string, setPath: (newPath: string) => void) => string;
} = {};

commandList.forEach((command) => {
	commands[command.key] = command.run;
});

export function runCommand(
	args: CommandArgs,
	path: string,
	setPath: (newPath: string) => void
): string {
	const command = args._[0];

	if (!command || !Object.keys(commands).includes(command)) {
		return `invalid command "${command}"`;
	}

	return commands[command](args, path, setPath);
}
