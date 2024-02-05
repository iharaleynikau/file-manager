import { rename as fsRename } from 'node:fs';
import { getItemInfo, outputMessages } from '../../utils.js';

const rename = async (path, newFileName) => {
  const fileToRenameInfo = await getItemInfo(path);
  const checkIsNewFileNameExist = await getItemInfo(newFileName);

  if (fileToRenameInfo.Type !== 'file' || checkIsNewFileNameExist.Type !== null) {
    return outputMessages.error;
  }

  try {
    const promise = await new Promise((resolve, reject) => {
      fsRename(path, newFileName, err => {
        resolve('File has been renamed');
      });
    });

    return promise;
  } catch (error) {
    return outputMessages.error;
  }
};

export default rename;
