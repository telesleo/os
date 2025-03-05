import type { Command } from "../../base/command";
import { createDirectory, getPath } from "../storage";

const dirCommand = {
  key: "dir",
  execute: function (args, _options, path) {
    const directoryPathRelative = args._[1] || "";
    const directoryPath = getPath(path, directoryPathRelative);

    createDirectory(directoryPath);

    return "";
  },
} as Command;

export default dirCommand;
