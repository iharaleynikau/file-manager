import { getItemInfo, outputMessages } from '../../utils.js';

const cd = async path => {
  const pathInfo = await getItemInfo(path);

  if (pathInfo.Type !== 'directory') {
    return outputMessages.error;
  }

  return path;
};

export default cd;
