import os from 'node:os';

const osInfo = command => {
  switch (command) {
    case '--EOL':
      return JSON.stringify(os.EOL);

    case '--cpus':
      return `Number of CPUs: ${os.cpus().length}\nModel of CPUs: ${os.cpus()[0].model}\nClock rate (GHz): ${
        os.cpus()[0].speed / 1000
      }`;

    case '--homedir':
      return os.homedir();

    case '--username':
      return os.userInfo().username;

    case '--architecture':
      return os.arch();

    default:
      return 'Operation failed';
  }
};

export default osInfo;
