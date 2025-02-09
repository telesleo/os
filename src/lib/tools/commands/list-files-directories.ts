import { Command } from '$lib/base/command';
import { getDirectory } from '../storage-handler';

class ListFilesDirectoriesCommand extends Command {
	constructor() {
		super('list');
	}

	run() {
		const directory = getDirectory('/');
		return Object.keys(directory).join(' ');
	}
}

export default new ListFilesDirectoriesCommand();
