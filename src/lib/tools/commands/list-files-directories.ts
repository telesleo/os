import { Command } from '$lib/base/command';
import type CommandArgs from '$lib/base/command-args';
import { getDirectory } from '../storage-handler';
import pathBrowserify from 'path-browserify';

class ListFilesDirectoriesCommand extends Command {
	constructor() {
		super('list');
	}

	run(args: CommandArgs, path: string) {
		const dirPath = pathBrowserify.resolve(path, args._[1] || '.');

		const directory = getDirectory(dirPath);

		return Object.keys(directory).join(' ');
	}
}

export default new ListFilesDirectoriesCommand();
