const { stdin, stdout} = require('node:process');
const process = require('node:process');
const fs = require('node:fs');
const path = require('node:path');
const filePath = path.resolve(__dirname, 'text.txt');
const writableStream = fs.createWriteStream(filePath);
stdin.write('What is your name?');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    console.log('GOOD BYE!');
    process.exit();
  }
  writableStream.write(data);
})

process.on('SIGINT', () => {
  console.log('GOOD BYE!');
  process.exit();
})
