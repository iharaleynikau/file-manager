import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { getItemInfo, outputMessages } from '../../utils.js';

const compress = async (filePath, pathToCompress) => {
  const fileInfo = await getItemInfo(filePath);
  pathToCompress = path.join(pathToCompress, path.basename(filePath) + '.br');

  if (fileInfo.Type !== 'file') {
    return outputMessages.error;
  }

  try {
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(pathToCompress);

    const brotli = zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);

    return 'File has been compressed';
  } catch (error) {
    return outputMessages.error;
  }
};

export default compress;
