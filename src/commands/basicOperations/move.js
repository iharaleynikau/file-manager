import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { getItemInfo } from '../../utils.js';
import remove from './delete.js';

const fsPath = path;

const move = async (path, pathToMove) => {
  const fileInfo = await getItemInfo(path);
  const checkPath = await getItemInfo(pathToMove);

  if (fileInfo.Type !== 'file' || checkPath.Type !== 'directory') {
    return 'Operation failed';
  }

  pathToMove = pathToMove + '/' + fsPath.basename(path);
  console.log(fsPath.basename(path));

  try {
    const readableStream = createReadStream(path);
    const writableStream = createWriteStream(pathToMove);

    readableStream.pipe(
      writableStream.on('finish', async () => {
        await remove(path);
      })
    );

    return 'File has been moved into ' + pathToMove;
  } catch (error) {
    return 'Operation failed: ' + error.message;
  }
};

export default move;
