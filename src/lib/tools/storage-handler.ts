import storage from '$lib/data/storage.svelte';

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
