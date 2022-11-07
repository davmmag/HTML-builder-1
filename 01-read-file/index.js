const { createReadStream } = require('node:fs');
const { resolve } = require('node:path');

const logFile = (name) => {
  try {
    const filePath = resolve(__dirname, name);
    const readableStream = createReadStream(filePath, { encoding: 'utf-8' });
    readableStream.on('readable', () => {
      const data = readableStream.read();
      console.log(data);
      readableStream.close();
    })
  } catch(error) {
    console.log(error)
  }
}

logFile('text.txt');