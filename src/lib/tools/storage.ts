import type { Directory } from "../base/storage";
import storage from "../data/storage.svelte";
import pathBrowserify from "path-browserify";
import {
  DirectoryAlreadyExists,
  DirectoryNotFound,
  DirectoryOrFileNotFound,
  InvalidPath,
} from "../errors/storage";

export function getPath(path: string, relativePath: string) {
  const old = "thing";

  try {
    return pathBrowserify.resolve(path, relativePath);
  } catch (error) {
    throw new InvalidPath(old);
  }
}

export function getDirectory(path: string) {
  const pathPieces = path.split("/").filter(Boolean);

  let currentDirectory: Directory = storage.value;

  for (
    let pathPieceIndex = 0;
    pathPieceIndex < pathPieces.length;
    pathPieceIndex++
  ) {
    const pathPiece = pathPieces[pathPieceIndex];

    if (!(pathPiece in currentDirectory)) {
      return undefined;
    }

    currentDirectory = currentDirectory[pathPiece];
  }

  return currentDirectory;
}

export function isDirectoryValid(path: string) {
  return getDirectory(path) !== undefined;
}

export function createDirectory(path: string) {
  const parentDirectoryPath = pathBrowserify.dirname(path);
  const directoryName = pathBrowserify.basename(path);

  const parentDirectory = getDirectory(parentDirectoryPath);

  if (!parentDirectory) {
    throw new DirectoryNotFound(parentDirectoryPath);
  }

  if (directoryName in parentDirectory) {
    throw new DirectoryAlreadyExists(path);
  }

  parentDirectory[directoryName] = {};
}

export function deleteDirectoryOrFile(path: string) {
  const parentDirectoryPath = pathBrowserify.dirname(path);
  const directoryFileName = pathBrowserify.basename(path);

  const parentDirectory = getDirectory(parentDirectoryPath);

  if (!parentDirectory) {
    throw new DirectoryNotFound(parentDirectoryPath);
  }

  if (!(directoryFileName in parentDirectory)) {
    throw new DirectoryOrFileNotFound(path);
  }

  delete parentDirectory[directoryFileName];
}
