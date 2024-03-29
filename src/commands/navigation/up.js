import path from 'node:path';

const up = currentPath => {
  const resultPath = path.resolve(currentPath, '..');
  return resultPath === '/' ? currentPath : resultPath;
};

export default up;
