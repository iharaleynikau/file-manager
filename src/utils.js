import { stat, promises, constants } from 'node:fs';
import path from 'node:path';

const nodePath = path;

const doesExist = async path => {
  try {
    await promises.access(path, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const getItemInfo = async path => {
  const isExisting = await doesExist(path);

  if (!isExisting) {
    return {
      Name: 'file does not exist',
      Type: null
    };
  }

  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      resolve({
        Name: nodePath.basename(path),
        Type: stats.isFile() ? 'file' : 'directory'
      });
    });
  });
};
