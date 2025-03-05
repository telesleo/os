import minimist from "minimist";
import shellQuote from "shell-quote";
import clearCommand from "./commands/clear";
import type { Command, CommandExecute, CommandOptions } from "../base/command";
import {
  directoryExists,
  invalidCommand,
  invalidDirectory,
  invalidPath,
} from "./command-messages";
import pathCommand from "./commands/path";
import goCommand from "./commands/go";
import type { SetPath } from "../base/terminal";
import dirCommand from "./commands/dir";
import listCommand from "./commands/list";
import {
  DirectoryAlreadyExists,
  DirectoryNotFound,
  InvalidPath,
} from "../errors/storage";

const commandList: Command[] = [
  clearCommand,
  pathCommand,
  goCommand,
  listCommand,
  dirCommand,
];

const commands: Record<string, CommandExecute> = commandList.reduce(
  (commandMap, command) => {
    commandMap[command.key] = command.execute;
    return commandMap;
  },
  {} as Record<string, CommandExecute>
);

export default function executeCommand(
  input: string,
  path: string,
  setPath: SetPath
): {
  message: string;
  options: CommandOptions;
} {
  const argsArray = shellQuote.parse(input) as string[];
  const args = minimist(argsArray);

  let message = "";
  const options = { clear: false };

  const commandKey = args._[0] || "";

  if (!commandKey || !(commandKey in commands)) {
    message = invalidCommand(commandKey);
    return { message, options };
  }

  try {
    message = commands[commandKey](args, options, path, setPath);
  } catch (error) {
    if (error instanceof InvalidPath) {
      message = invalidPath((error as InvalidPath).path);
    } else if (error instanceof DirectoryNotFound) {
      message = invalidDirectory((error as DirectoryNotFound).path);
    } else if (error instanceof DirectoryAlreadyExists) {
      message = directoryExists((error as DirectoryAlreadyExists).path);
    }
  }

  return { message, options };
}
