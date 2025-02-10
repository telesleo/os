import { Command } from '$lib/base/command';
import type CommandArgs from '$lib/base/command-args';
import { createDirectory } from '../storage-handler';
import pathBrowserify from 'path-browserify';

class CreateDirectoryCommand extends Command {
	constructor() {
		super('dir');
	}

	run(args: CommandArgs, path: string) {
		const dirPath = pathBrowserify.resolve(path, args._[1] || '.');

		const directory = createDirectory(dirPath);

		return '';
	}
}

export default new CreateDirectoryCommand();
