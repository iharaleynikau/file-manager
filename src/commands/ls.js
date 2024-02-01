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
          index: list.indexOf(listItem),
          type: stats.isFile() ? 'file' : 'directory'
        });
      });
    });

    listData.add(listItemData);
  }

  const result = await Promise.allSettled(listData);

  return result.map(data => {
    return data.value;
  });
};

export default ls;
