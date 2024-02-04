import readline from 'node:readline';
import os from 'node:os';
// navigation
import ls from './commands/navigation/ls.js';
import up from './commands/navigation/up.js';
import cd from './commands/navigation/cd.js';
// os info
import osInfo from './commands/osInfo/osInfo.js';
// hash
import calculateHash from './commands/hash/hash.js';
// basic operations
import cat from './commands/basicOperations/cat.js';
import create from './commands/basicOperations/create.js';
import remove from './commands/basicOperations/delete.js';
import rename from './commands/basicOperations/rename.js';
import copy from './commands/basicOperations/copy.js';
import move from './commands/basicOperations/move.js';

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
      case 'mv':
        if (line.split(' ').length < 3) {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg1 = line.split(' ').slice(1)[0];
          const arg2 = line.split(' ').slice(1)[1];

          const moveFile = await move(
            arg1.startsWith('/') ? arg1 : `${currentPath}/${arg1}`,
            arg2.startsWith('/') ? arg2 : `${currentPath}/${arg2}`
          );

          console.log(moveFile);
          console.log(complitePathText);
        }

        break;

      case 'cp':
        if (line.split(' ').length < 3) {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg1 = line.split(' ').slice(1)[0];
          const arg2 = line.split(' ').slice(1)[1];

          const copyFile = await copy(
            arg1.startsWith('/') ? arg1 : `${currentPath}/${arg1}`,
            arg2.startsWith('/') ? arg2 : `${currentPath}/${arg2}`
          );

          console.log(copyFile);
          console.log(complitePathText);
        }
        break;

      case 'rn':
        if (line.split(' ').length < 3 || line.split(' ')[1] === '') {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg1 = line.split(' ').slice(1)[0];
          const arg2 = line.split(' ').slice(1)[1];

          console.log(arg1, arg2);

          const renameFile = await rename(
            arg1.startsWith('/') ? arg1 : `${currentPath}/${arg1}`,
            arg2.startsWith('/') ? arg2 : `${currentPath}/${arg2}`
          );

          console.log(renameFile);
          console.log(complitePathText);
        }

        break;
      case 'rm':
        if (line.split(' ').length < 2 || line.split(' ')[1] === '') {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg = line.split(' ').slice(1)[0];

          const removeFile = await remove(arg.startsWith('/') ? arg : `${currentPath}/${arg}`);

          console.log(removeFile);
          console.log(complitePathText);
        }
        break;

      case 'add':
        if (line.split(' ').length < 2 || line.split(' ')[1] === '') {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg = line.split(' ').slice(1)[0];

          const createFile = await create(currentPath, arg);

          console.log(createFile);
          console.log(complitePathText);
        }

        break;

      case 'cat':
        if (line.split(' ').length < 2 || line.split(' ')[1] === '') {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg = line.split(' ').slice(1)[0];

          if (arg.startsWith('/')) {
            const readFile = await cat(arg);
            console.log(readFile);
            console.log(complitePathText);
          } else {
            const readFile = await cat(currentPath + '/' + arg);
            console.log(readFile);
            console.log(complitePathText);
          }
        }
        break;

      case 'os':
        if (line.split(' ').length < 2 || line.split(' ')[1] === '') {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg = line.split(' ').slice(1)[0].split('--')[1];

          osInfo(arg);
          console.log(complitePathText);
        }

        break;

      case 'hash':
        if (line.split(' ').length < 2 || line.split(' ')[1] === '') {
          console.log('Operation failed\n' + complitePathText);
        } else {
          const arg = line.split(' ').slice(1)[0];

          if (arg.startsWith('/')) {
            const hash = await calculateHash(arg);
            console.log(hash);
            console.log(complitePathText);
          } else {
            const hash = await calculateHash(currentPath + '/' + arg);

            console.log(hash);
            console.log(complitePathText);
          }
        }
        break;

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
