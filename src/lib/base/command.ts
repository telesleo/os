import type { ParsedArgs } from "minimist";
import type { SetPath } from "./terminal";

export interface CommandOptions {
  clear: boolean;
}

export type CommandExecute = (
  args: ParsedArgs,
  options: CommandOptions,
  path: string,
  setPath: SetPath
) => string;

export interface Command {
  key: string;
  execute: CommandExecute;
}
