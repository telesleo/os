import shellQuote from 'shell-quote';
import minimist from 'minimist';
import type CommandArgs from '$lib/base/command-args';

export function parseCommand(input: string): CommandArgs {
	return minimist(shellQuote.parse(input) as string[]);
}
