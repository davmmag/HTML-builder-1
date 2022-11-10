const { stat, readdir } = require('node:fs/promises');
const { resolve, extname } = require('node:path');
const folderPath = resolve(__dirname, 'secret-folder');

const getFiles = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });
    return files;
  } catch (e) {
    console.log(e);
  }
}

const getInfoOfFiles = async (path) => {
  try {
    const files = await getFiles(path);
    for (let item of files) {
      if (extname(item.name).length === 0) {
        continue;
      }
      if (item.isDirectory()) {
        await getInfoOfFiles(resolve(path, item.name))
      } else {
        const name = item.name;
        const stats = await stat((resolve(path, name)));
        const size = stats.size;
        const ext = extname(name).slice(1);
        console.log(`${name} - ${ext} - ${size}byte`);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

getInfoOfFiles(folderPath);