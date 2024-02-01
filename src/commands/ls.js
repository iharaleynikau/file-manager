import os from 'node:os';
import { promises, stat } from 'node:fs';

const ls = async () => {
  const list = await promises.readdir(os.homedir());

  const path = os.homedir() + '/';

  const listData = new Set();

  for (let listItem of list) {
    const listItemData = new Promise((resolve, reject) => {
      stat(path + listItem, (err, stats) => {
        resolve({
          name: listItem,
          type: stats.isFile() ? 'file' : 'directory'
        });
      });
    });

    listData.add(listItemData);
  }

  const resultPromise = await Promise.allSettled(listData);

  const resultToSort = resultPromise.map(data => {
    return data.value;
  });

  const sortByFiles = resultToSort.filter(item => {
    return item.type === 'file';
  });

  const sortByDirs = resultToSort.filter(item => {
    return item.type === 'directory';
  });

  sortByFiles.sort((a, b) => a.name.localeCompare(a.name));
  sortByDirs.sort((a, b) => a.name.localeCompare(a.name));

  const result = [...sortByDirs, ...sortByFiles].map((item, index) => {
    return {
      ...item,
      index
    };
  });

  return result;
};

export default ls;
