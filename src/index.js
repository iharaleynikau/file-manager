import readline from 'node:readline';
import os from 'node:os';
import ls from './commands/navigation/ls.js';
import up from './commands/navigation/up.js';
import cd from './commands/navigation/cd.js';

const fileManager = async () => {
  const args = process.argv.slice(2);

  const userName = !args[0] ? 'username' : args[0].split('--username=').join('');

  let currentPath = os.homedir();
  const currentPathText = `You are currently in `;

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
    const complitePathText = currentPathText + currentPath + '\n';

    switch (line.split(' ')[0]) {
      case 'cd':
        if (line.split(' ').length < 2 || line.split(' ')[1] === '') {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg = line.split(' ').slice(1);

          const step = await cd(currentPath, arg);
          currentPath = step.type === 'error' ? currentPath : step.result;
          console.log(
            step.type === 'error'
              ? 'Operation failed\n' + complitePathText
              : currentPathText + step.result + '\n'
          );
        }
        break;

      case 'ls':
        console.table(
          list.map(item => {
            return {
              Name: item.Name,
              Type: item.Type
            };
          })
        );

        console.log(currentPathText + currentPath + '\n');
        break;

      case 'up':
        currentPath = up(currentPath);
        console.log(currentPathText + currentPath + '\n');
        break;

      case '.exit':
        console.log(exitText);
        process.exit();

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
