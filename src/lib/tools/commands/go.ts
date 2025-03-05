import type { Command } from "../../base/command";
import { invalidDirectory } from "../command-messages";
import { getPath, isDirectoryValid } from "../storage";

const goCommand = {
  key: "go",
  execute: function (args, _options, path, setPath) {
    const directoryPathRelative = args._[1] || "";
    const directoryPath = getPath(path, directoryPathRelative);

    if (!isDirectoryValid(directoryPath)) {
      return invalidDirectory(directoryPath);
    }

    setPath(directoryPath);
  },
} as Command;

export default goCommand;
