import { stat, promises, constants } from 'node:fs';

const doesExist = async path => {
  try {
    await promises.access(path, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const getItemInfo = async (path, item) => {
  const isExisting = await doesExist(path + '/' + item);

  if (!isExisting) {
    return {
      Name: 'file does not exist',
      Type: null
    };
  }

  return new Promise((resolve, reject) => {
    stat(`${path}/${item}`, (err, stats) => {
      resolve({
        Name: item,
        Type: stats.isFile() ? 'file' : 'directory'
      });
    });
  });
};
