import { writeFile } from 'node:fs';
import { getItemInfo } from '../../utils.js';

const create = async (path, filename) => {
  const fileInfo = await getItemInfo(`${path}/${filename}`);

  if (fileInfo.Type === 'file') {
    return 'Operation failed';
  } else {
    const promise = await new Promise((resolve, reject) => {
      writeFile(`${path}/${filename}`, '', err => {
        if (err) {
          resolve('Operation failed');
        } else {
          resolve('File has been created');
        }
      });
    });
    return promise;
  }
};

export default create;
