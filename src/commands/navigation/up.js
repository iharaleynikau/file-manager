import path from 'node:path';

const up = (currentPath = '/') => {
  return path.resolve(currentPath, '..');
};

export default up;
