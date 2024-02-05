import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { getItemInfo, outputMessages } from '../../utils.js';

const calculateHash = async path => {
  const itemInfo = await getItemInfo(path);

  if (itemInfo.Type !== 'file') {
    return outputMessages.error;
  }

  try {
    const hash = createHash('sha256');

    const stream = createReadStream(path);

    stream.on('data', chunk => {
      hash.update(chunk);
    });

    const promise = await new Promise((resolve, reject) => {
      stream.on('end', () => {
        resolve(hash.digest('hex'));
      });
    });

    const result = promise;

    return result;
  } catch (error) {
    return outputMessages.error;
  }
};

export default calculateHash;
