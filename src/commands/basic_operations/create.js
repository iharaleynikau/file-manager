import { writeFile } from 'node:fs';
import { getItemInfo, outputMessages } from '../../utils.js';

const create = async path => {
  const fileInfo = await getItemInfo(path);

  if (fileInfo.Type === 'file') {
    return outputMessages.error;
  }

  try {
    const promise = await new Promise((resolve, reject) => {
      writeFile(path, '', err => {
        resolve('File has been created');
      });
    });

    return promise;
  } catch (error) {
    return outputMessages.error;
  }
};

export default create;
