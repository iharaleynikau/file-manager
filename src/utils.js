import { stat, promises, constants } from 'node:fs';
import path from 'node:path';

const doesExist = async itemPath => {
  try {
    await promises.access(itemPath, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const getItemInfo = async itemPath => {
  const isExisting = await doesExist(itemPath);

  if (!isExisting) {
    return {
      Name: 'file does not exist',
      Type: null
    };
  }

  return new Promise((resolve, reject) => {
    stat(itemPath, (err, stats) => {
      resolve({
        Name: path.basename(itemPath),
        Type: stats.isFile() ? 'file' : 'directory'
      });
    });
  });
};

export const outputMessages = {
  error: 'Operation failed'
};
