const { resolve, extname } = require('node:path');
const { readdir, readFile, appendFile } = require('node:fs/promises');
const { createWriteStream, createReadStream } = require('node:fs');
const folderPath = resolve(__dirname, 'styles');
const bundleFolderPath = resolve(__dirname, 'project-dist');
const bundleFilePath = resolve(bundleFolderPath, 'bundle.css')
const writableStream = createWriteStream(bundleFilePath);

//without streams
// const getFiles = async (path) => {
//   try {
//     const files = await readdir(path, { withFileTypes: true }).then(data => data.filter(file => extname(file.name) === '.css'));
//     const filesNames = files.map(file => file.name);
//     for (let name of filesNames) {
//       const filePath = resolve(folderPath, name);
//       const fileData = await readFile(filePath, { encoding: 'utf-8'});
//       await appendFile(bundleFilePath, fileData);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

//Use streams
const getFiles = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true }).then(data => data.filter(file => extname(file.name) === '.css'));
    const filesNames = files.map(file => file.name);
    for (let name of filesNames) {
      const filePath = resolve(folderPath, name);
      const readableStream = createReadStream(filePath);
      readableStream.pipe(writableStream);
    }
  } catch (e) {
    console.log(e);
  }
}

getFiles(folderPath);

