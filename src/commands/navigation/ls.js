import { promises, stat } from 'node:fs';

const ls = async path => {
  const list = await promises.readdir(path);

  const listData = new Set();

  for (let listItem of list) {
    const listItemData = new Promise((resolve, reject) => {
      stat(`${path}/${listItem}`, (err, stats) => {
        resolve({
          Name: listItem,
          Type: stats.isFile() ? 'file' : 'directory'
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
    return item.Type === 'file';
  });

  const sortByDirs = resultToSort.filter(item => {
    return item.Type === 'directory';
  });

  sortByFiles.sort((a, b) => a.Name.localeCompare(a.Name));
  sortByDirs.sort((a, b) => a.Name.localeCompare(a.Name));

  const result = [...sortByDirs, ...sortByFiles];

  return result;
};

export default ls;
