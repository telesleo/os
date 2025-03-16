import type { Command } from "../../base/command";
import { deleteDirectoryOrFile, getPath } from "../storage";

const delCommand = {
  key: "del",
  execute: function (args, _options, path) {
    const directoryFilePathRelative = args._[1] || "";
    const directoryFilePath = getPath(path, directoryFilePathRelative);

    deleteDirectoryOrFile(directoryFilePath);

    return "";
  },
} as Command;

export default delCommand;
