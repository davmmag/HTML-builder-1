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

const copyFiles = async (path, pathCopy) => {
  try {
    await mkdir(pathCopy, { recursive: true });
    const nameFiles = await getNameOfFiles(path);
    for (const item of nameFiles) {
      const copyFilePath = resolve(copyFolderPath, item);
      const filePath = resolve(path, item);
      await copyFile(filePath, copyFilePath);
    }
  } catch (e) {
    console.log(e);
  }
}

copyFiles(folderPath, copyFolderPath);