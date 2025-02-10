import storage from '$lib/data/storage.svelte';
import pathBrowserify from 'path-browserify';

export function getDirectory(path: string) {
	let currentDirectory: { [key: string]: any } = storage.main;

	const pathPieces: string[] = path.split('/').filter(Boolean);

	for (let index = 0; index < pathPieces.length; index++) {
		const pathPiece = pathPieces[index];
		if (!currentDirectory[pathPiece]) {
			break;
		}
		currentDirectory = currentDirectory[pathPiece];
	}

	return currentDirectory;
}

export function createDirectory(path: string) {
	const parentDirectoryName = pathBrowserify.dirname(path);
	const newDirectoryName = pathBrowserify.basename(path);
	const directory = getDirectory(parentDirectoryName);
	directory[newDirectoryName] = {};
}
