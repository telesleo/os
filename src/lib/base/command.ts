import type CommandArgs from './command-args';

export abstract class Command {
	key: string;

	constructor(key: string) {
		this.key = key;
	}

	abstract run(args: CommandArgs, path: string): string;
}
