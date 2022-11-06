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
    const files = await getFiles(path).then(data => data.filter(file => file.isFile()));
    for (let file of files) {
      const name = file.name;
      const stats = await stat((resolve(folderPath, name)));
      const size = stats.size;
      const ext = extname(name);
      console.log(`${name} - ${ext} - ${size}byte`);
    }
  } catch (e) {
    console.log(e);
  }
}

getInfoOfFiles(folderPath);