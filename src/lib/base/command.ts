export abstract class Command {
	key: string;

	constructor(key: string) {
		this.key = key;
	}

	abstract run(args: { _: string[] }): void;
}
