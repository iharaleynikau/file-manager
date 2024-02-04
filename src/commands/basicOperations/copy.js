import { createReadStream, createWriteStream } from 'node:fs';
import { getItemInfo } from '../../utils.js';

const copy = async (path, pathForCopy) => {
  const fileInfo = await getItemInfo(path);

  if (fileInfo.Type !== 'file' || path === pathForCopy) {
    return 'Operation failed';
  }

  try {
    const readableStream = createReadStream(path);
    const writableStream = createWriteStream(pathForCopy);

    readableStream.pipe(writableStream);

    return 'File has been copied into ' + pathForCopy;
  } catch (error) {
    return 'Operation failed';
  }
};

export default copy;
