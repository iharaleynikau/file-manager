import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { getItemInfo, outputMessages } from '../../utils.js';

const decompress = async (filePath, pathToDecompress) => {
  const fileInfo = await getItemInfo(filePath);
  const decompressedFilePath = path.basename(filePath).split('.');
  pathToDecompress = path.join(pathToDecompress, decompressedFilePath.slice(0, -1).join('.'));

  console.log(filePath);
  console.log(decompressedFilePath);
  console.log(pathToDecompress);

  if (fileInfo.Type !== 'file') {
    return outputMessages.error;
  }

  try {
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(pathToDecompress);

    const brotli = zlib.createBrotliDecompress();

    readStream.pipe(brotli).pipe(writeStream);

    return 'File has been decompressed';
  } catch (error) {
    return outputMessages.error;
  }
};

export default decompress;
