import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { getItemInfo, outputMessages } from '../../utils.js';
import remove from './delete.js';

const move = async (filePath, pathToMove) => {
  const complitePathToMove = path.join(pathToMove, path.basename(filePath));

  const fileInfo = await getItemInfo(filePath);
  const pathToMoveInfo = await getItemInfo(pathToMove);
  const isSameFileExisting = await getItemInfo(complitePathToMove);

  if (fileInfo.Type !== 'file' || pathToMoveInfo.Type !== 'directory' || isSameFileExisting.Type === 'file') {
    return outputMessages.error;
  }

  try {
    const readableStream = createReadStream(filePath);
    const writableStream = createWriteStream(complitePathToMove);

    readableStream.pipe(
      writableStream.on('finish', async () => {
        await remove(filePath);
      })
    );

    return 'File has been moved into ' + pathToMove;
  } catch (error) {
    return outputMessages.error;
  }
};

export default move;
