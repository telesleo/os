export function invalidCommand(commandKey: string) {
  return `command "${commandKey}" does not exist`;
}

export function invalidDirectory(directoryPath: string) {
  return `directory "${directoryPath}" does not exist`;
}

export function directoryExists(directoryPath: string) {
  return `directory "${directoryPath}" already exists`;
}

export function invalidPath(path: string) {
  return `path "${path}" is not valid`;
}

export function invalidDirectoryOrFile(directoryPath: string) {
  return `directory or file "${directoryPath}" does not exist`;
}
