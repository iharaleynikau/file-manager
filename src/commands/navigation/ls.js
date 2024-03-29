import { promises } from 'node:fs';
import * as node_path from 'node:path';
import { getItemInfo } from '../../utils.js';

const ls = async path => {
  const list = await promises.readdir(path);

  const listData = new Set();

  for (let listItem of list) {
    const listItemData = await getItemInfo(node_path.join(path, listItem));

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

  sortByFiles.sort((a, b) => a.Name.localeCompare(b.Name));
  sortByDirs.sort((a, b) => a.Name.localeCompare(b.Name));

  const result = [...sortByDirs, ...sortByFiles];

  return result;
};

export default ls;
