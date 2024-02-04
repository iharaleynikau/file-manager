import { rename as fsRename } from 'node:fs';
import { getItemInfo } from '../../utils.js';

const rename = async (path, newFileName) => {
  const fileToRenameInfo = await getItemInfo(path);
  const checkIsNewFileNameExist = await getItemInfo(newFileName);

  if (fileToRenameInfo.Type !== 'file' || checkIsNewFileNameExist.Type !== null) {
    return 'Operation failed';
  } else {
    const promise = await new Promise((resolve, reject) => {
      fsRename(path, newFileName, err => {
        if (err) {
          reject(err);
        } else {
          resolve('File has been renamed');
        }
      });
    });

    return promise;
  }
};

export default rename;
