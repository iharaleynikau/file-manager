import { createReadStream, createWriteStream } from 'node:fs';
import { getItemInfo, outputMessages } from '../../utils.js';

const copy = async (path, pathForCopy) => {
  const fileInfo = await getItemInfo(path);

  if (fileInfo.Type !== 'file' || path === pathForCopy) {
    return outputMessages.error;
  }

  try {
    const readableStream = createReadStream(path);
    const writableStream = createWriteStream(pathForCopy);

    readableStream.pipe(writableStream);

    return 'File has been copied into ' + pathForCopy;
  } catch (error) {
    return outputMessages.error;
  }
};

export default copy;
