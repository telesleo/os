import type { Command } from "../../base/command";

const clearCommand = {
  key: "clear",
  execute: function (_args, options) {
    options.clear = true;

    return "";
  },
} as Command;

export default clearCommand;
