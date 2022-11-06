const { readdir, mkdir, copyFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const folderPath = resolve(__dirname, 'files');
const copyFolderPath = resolve(__dirname, `files-copy`);

const getNameOfFiles = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });
    return files.map(file => file.name);
  } catch (e) {
    console.log(e);
  }
}

const createFiles = async (path, pathCopy) => {
  await mkdir(copyFolderPath, { recursive: true });
  const nameFiles = await getNameOfFiles(folderPath);
  for (const item of nameFiles) {
    try {
      const copyFilePath = resolve(copyFolderPath, item);
      const filePath = resolve(folderPath, item);
      await copyFile(filePath, copyFilePath);
    } catch (e) {
      console.log(e)
    }
  }
}

createFiles(folderPath);