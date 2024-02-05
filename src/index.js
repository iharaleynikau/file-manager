import readline from 'node:readline';
import os from 'node:os';
import path from 'node:path';
// utils
import { outputMessages } from './utils.js';
// navigation
import ls from './commands/navigation/ls.js';
import up from './commands/navigation/up.js';
import cd from './commands/navigation/cd.js';
// os info
import osInfo from './commands/os_info/osInfo.js';
// hash
import calculateHash from './commands/hash/hash.js';
// basic operations
import cat from './commands/basic_operations/cat.js';
import create from './commands/basic_operations/create.js';
import remove from './commands/basic_operations/delete.js';
import rename from './commands/basic_operations/rename.js';
import copy from './commands/basic_operations/copy.js';
import move from './commands/basic_operations/move.js';
// brotli compress/decompress
import compress from './commands/compress/compress.js';
import decompress from './commands/compress/decompress.js';

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
    const command = line.split(' ')[0];

    const checkCommandArgsLength = num => Boolean(line.split(' ').length < num);

    const checkIsPathAbsolute = arg => (path.isAbsolute(arg) ? arg : path.join(currentPath, arg));

    const complitePathText = currentPath => `You are currently in ${currentPath}\n`;

    const showResult = result => process.stdout.write(`${result}\n${complitePathText(currentPath)}\n`);
    const showError = () => process.stdout.write('Operation failed\n' + complitePathText(currentPath));

    const arg1 = line.split(' ').slice(1)[0];
    const arg2 = line.split(' ').slice(1)[1];

    switch (command) {
      case 'compress':
        if (checkCommandArgsLength(3)) {
          showError();
        } else {
          const compressFile = await compress(checkIsPathAbsolute(arg1), checkIsPathAbsolute(arg2));

          showResult(compressFile);
        }
        break;

      case 'decompress':
        if (checkCommandArgsLength(3)) {
          showError();
        } else {
          const decompressFile = await decompress(checkIsPathAbsolute(arg1), checkIsPathAbsolute(arg2));

          showResult(decompressFile);
        }
        break;

      case 'mv':
        if (checkCommandArgsLength(3)) {
          showError();
        } else {
          const moveFile = await move(checkIsPathAbsolute(arg1), checkIsPathAbsolute(arg2));

          showResult(moveFile);
        }

        break;

      case 'cp':
        if (checkCommandArgsLength(3)) {
          showError();
        } else {
          const copyFile = await copy(checkIsPathAbsolute(arg1), checkIsPathAbsolute(arg2));

          showResult(copyFile);
        }
        break;

      case 'rn':
        if (checkCommandArgsLength(3)) {
          showError();
        } else {
          const renameFile = await rename(checkIsPathAbsolute(arg1), checkIsPathAbsolute(arg2));

          showResult(renameFile);
        }

        break;
      case 'rm':
        if (checkCommandArgsLength(2)) {
          showError();
        } else {
          const removeFile = await remove(checkIsPathAbsolute(arg1));

          showResult(removeFile);
        }
        break;

      case 'add':
        if (checkCommandArgsLength(2)) {
          showError();
        } else {
          const createFile = await create(checkIsPathAbsolute(arg1));

          showResult(createFile);
        }

        break;

      case 'cat':
        if (checkCommandArgsLength(2)) {
          showError();
        } else {
          const readFile = await cat(checkIsPathAbsolute(arg1));

          showResult(readFile);
        }
        break;

      case 'os':
        if (checkCommandArgsLength(2)) {
          showError();
        } else {
          showResult(osInfo(arg1));
        }

        break;

      case 'hash':
        if (checkCommandArgsLength(2)) {
          showError();
        } else {
          const hash = await calculateHash(checkIsPathAbsolute(arg1));

          showResult(hash);
        }
        break;

      case 'cd':
        if (checkCommandArgsLength(2)) {
          showError();
        } else {
          const move = await cd(checkIsPathAbsolute(arg1));

          currentPath = move === 'Operation failed' ? currentPath : move;

          showResult(move);
        }
        break;

      case 'ls':
        const list = await ls(currentPath);

        console.table(
          list.map(item => {
            return {
              Name: item.Name,
              Type: item.Type
            };
          })
        );

        process.stdout.write(`${complitePathText(currentPath)}\n`);
        break;

      case 'up':
        currentPath = up(currentPath);
        process.stdout.write(`${complitePathText(currentPath)}\n`);
        break;

      case '.exit':
        process.stdout.write(exitText);
        process.exit();

      default:
        process.stdout.write('Invalid input\n\n');
        break;
    }
  });

  process.on('SIGINT', () => {
    process.stdout.write('\n' + exitText);
    process.exit(0);
  });
};

await fileManager();
