import { unlink } from 'node:fs';
import { getItemInfo, outputMessages } from '../../utils.js';

const remove = async path => {
  const fileInfo = await getItemInfo(path);

  if (fileInfo.Type !== 'file') {
    return outputMessages.error;
  }

  try {
    const promise = await new Promise((resolve, reject) => {
      unlink(path, err => {
        resolve('File has been removed');
      });
    });

    return promise;
  } catch (error) {
    return outputMessages.error;
  }
};

export default remove;
