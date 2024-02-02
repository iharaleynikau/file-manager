import { promises, stat } from 'node:fs';
import { getItemInfo } from '../../utils.js';

const ls = async path => {
  const list = await promises.readdir(path);

  const listData = new Set();

  for (let listItem of list) {
    const listItemData = await getItemInfo(path, listItem);

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
