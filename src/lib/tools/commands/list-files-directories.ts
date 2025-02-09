import { Command } from '$lib/base/command';
import type CommandArgs from '$lib/base/command-args';
import { getDirectory } from '../storage-handler';

class ListFilesDirectoriesCommand extends Command {
	constructor() {
		super('list');
	}

	run(args: CommandArgs, path: string) {
		const dirPath = args._[1] ? args._[1] : path;

		const directory = getDirectory(dirPath);

		return Object.keys(directory).join(' ');
	}
}

export default new ListFilesDirectoriesCommand();
