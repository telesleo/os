class PathError extends Error {
  path: string;

  constructor(message: string, path: string) {
    super(message);
    this.path = path;
  }
}

export class DirectoryOrFileNotFound extends PathError {
  constructor(path: string) {
    super(`Directory or file "${path}" not found`, path);
  }
}

export class DirectoryNotFound extends PathError {
  constructor(path: string) {
    super(`Directory "${path}" not found`, path);
  }
}

export class DirectoryAlreadyExists extends PathError {
  constructor(path: string) {
    super(`Directory "${path}" already exists`, path);
  }
}

export class InvalidPath extends PathError {
  constructor(path: string) {
    super(`Path "${path}" is invalid`, path);
  }
}
