import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { getItemInfo } from '../../utils.js';

const calculateHash = async path => {
  const itemInfo = await getItemInfo(path);

  if (itemInfo.Type !== 'file') {
    return 'Operation failed';
  }

  const hash = createHash('sha256');

  const stream = createReadStream(path);

  const set = new Set();

  stream.on('data', chunk => {
    hash.update(chunk);
  });

  const promise = new Promise((resolve, reject) => {
    stream.on('end', () => {
      resolve(hash.digest('hex'));
    });
  });

  set.add(promise);

  const result = await Promise.allSettled(set);

  return result[0].value;
};

export default calculateHash;
