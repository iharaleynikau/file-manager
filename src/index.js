import readline from 'node:readline';
import os from 'node:os';
import ls from './commands/ls.js';
import up from './commands/navigation/up.js';
import path from 'node:path';

const fileManager = async () => {
  const args = process.argv.slice(2);

  const userName = !args[0] ? 'username' : args[0].split('--username=').join('');

  let currentPath = os.homedir();

  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${currentPath}\n`);

  const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  const exitText = `Thank you for using File Manager, ${userName}, goodbye!`;

  readInput.on('line', async line => {
    const list = await ls(currentPath);

    switch (line) {
      case 'ls':
        console.table(
          list.map(item => {
            return {
              Name: item.Name,
              Type: item.Type
            };
          })
        );

        console.log(`You are currently in ${currentPath}\n`);
        break;

      case 'up':
        currentPath = up(currentPath);
        console.log(`You are currently in ${currentPath}\n`);
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
