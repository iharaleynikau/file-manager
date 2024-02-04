import { unlink } from 'node:fs';
import { getItemInfo } from '../../utils.js';

const remove = async path => {
  const fileInfo = await getItemInfo(path);

  if (fileInfo.Type !== 'file') {
    return 'Operation failed';
  } else {
    const promise = await new Promise((resolve, reject) => {
      unlink(path, err => {
        if (err) {
          resolve('Operation failed');
        } else {
          resolve('File has been removed');
        }
      });
    });

    return promise;
  }
};

export default remove;
