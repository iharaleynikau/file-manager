import os from 'node:os';

const osInfo = command => {
  switch (command) {
    case 'EOL':
      console.log(JSON.stringify(os.EOL));
      break;

    case 'cpus':
      console.log('Number of CPUs: ' + os.cpus().length);
      console.log('Model of CPus: ' + os.cpus()[0].model);
      console.log('Clock rate (GHz): ' + os.cpus()[0].speed / 1000);
      break;

    case 'homedir':
      console.log(os.homedir());
      break;

    case 'username':
      console.log(os.userInfo().username);
      break;

    case 'architecture':
      console.log(os.arch());
      break;

    default:
      console.log('Operation failed');
  }
};

export default osInfo;
