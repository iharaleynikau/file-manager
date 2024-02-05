import { readFile } from 'node:fs';
import { getItemInfo, outputMessages } from '../../utils.js';

const cat = async path => {
  const itemInfo = await getItemInfo(path);

  if (itemInfo.Type === null || itemInfo.Type === 'directory') {
    return outputMessages.error;
  }

  try {
    const readPromise = new Promise((resolve, reject) => {
      readFile(path, 'utf8', (err, data) => {
        resolve(data);
      });
    });

    const result = await readPromise;

    return result;
  } catch (error) {
    console.log(outputMessages.error);
  }
};

export default cat;
