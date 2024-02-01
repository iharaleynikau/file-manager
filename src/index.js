import readline from 'node:readline';
import os from 'node:os';
import ls from './commands/ls.js';

const fileManager = async () => {
  const args = process.argv.slice(2);

  const userName = !args[0] ? 'username' : args[0].split('--username=').join('');

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${os.homedir()}\n`);

  const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const exitText = `Thank you for using File Manager, ${userName}, goodbye!`;

  const list = await ls();

  readInput.on('line', line => {
    switch (line) {
      case 'ls':
        console.log(list);
        break;

      case '.exit':
        console.log(exitText);
        process.exit();
        break;

      default:
        console.log('Invalid input\n');
        break;
    }
  });

  process.on('SIGINT', () => {
    console.log('\n' + exitText);
    process.exit(0);
  });
};

await fileManager();
