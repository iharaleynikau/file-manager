import { getItemInfo } from '../../utils.js';

const cd = async (path, dir) => {
  const resultPath = path + '/' + dir;

  const type = await getItemInfo(resultPath);

  if (type.Type === 'file' || type.Type === null) {
    return {
      type: 'error',
      result: null
    };
  } else {
    return {
      type: 'success',
      result: resultPath
    };
  }
};

export default cd;
