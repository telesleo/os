import shellQuote from 'shell-quote';
import minimist from 'minimist';

export function parseCommand(input: string): { _: string[] } {
	return minimist(shellQuote.parse(input) as string[]);
}
