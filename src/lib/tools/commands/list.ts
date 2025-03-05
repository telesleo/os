import type { Command } from "../../base/command";
import { getDirectory, getPath } from "../storage";
import { invalidDirectory, invalidPath } from "../command-messages";

const listCommand = {
  key: "list",
  execute: function (args, _options, path, setPath) {
    const directoryRelativePath = args._[1] || "";
    const directoryPath = getPath(path, directoryRelativePath);

    const directory = getDirectory(directoryPath);

    if (!directory) {
      return invalidDirectory(directoryPath);
    }

    return Object.keys(directory).join(" ");
  },
} as Command;

export default listCommand;
