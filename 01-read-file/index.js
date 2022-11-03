const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const logFile = async (name) => {
  try {
    const filePath = resolve(__dirname, name);
    const contents = await readFile(filePath, { encoding: 'utf-8' });
    console.log(contents);
  } catch(error) {
    console.log(error)
  }
}

logFile('text.txt');