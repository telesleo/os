import { Command } from '$lib/base/command';
import type CommandArgs from '$lib/base/command-args';
import pathBrowserify from 'path-browserify';
import { isPathValid } from '../storage-handler';

class AccessDirectoryCommand extends Command {
	constructor() {
		super('goto');
	}

	run(args: CommandArgs, path: string, setPath: (newPath: string) => void) {
		const newPath = pathBrowserify.resolve(path, args._[1] || '.');

		if (!isPathValid(newPath)) {
			return `invalid path "${newPath}"`;
		}

		setPath(newPath);
		return '';
	}
}

export default new AccessDirectoryCommand();
