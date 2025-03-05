import type { Command } from "../../base/command";

const pathCommand = {
  key: "path",
  execute: function (_args, _options, path) {
    return path;
  },
} as Command;

export default pathCommand;
