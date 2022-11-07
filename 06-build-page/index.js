const { resolve, extname, basename } = require('node:path');
const { readdir, readFile, mkdir, rmdir, copyFile, access } = require('node:fs/promises');
const { createWriteStream, createReadStream } = require('node:fs');
const bundleFolderPath = resolve(__dirname, 'project-dist');
const bundleStylesPath = resolve(bundleFolderPath, 'style.css')
const assetsPath = resolve(__dirname, 'assets');
const assetsBundlePath = resolve(bundleFolderPath, 'assets');
const componentsPath = resolve(__dirname, 'components');
const stylesPath = resolve(__dirname, 'styles');
const HTMLPath = resolve(__dirname, 'template.html');
const bundleHTMLPath = resolve(bundleFolderPath, 'index.html');

const check = async () => {
  try {
    await access(bundleFolderPath);
    await rmdir(bundleFolderPath);
  } catch (error) {
    
  }
}

check();
const writableStreamStyles = createWriteStream(bundleStylesPath);

const getStylesFiles = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });
    const filesNames = files.filter(file => extname(file.name) === '.css')
                                  .map(file => file.name);
    for (let name of filesNames) {
      const filePath = resolve(stylesPath, name);
      const readableStream = createReadStream(filePath);
      readableStream.pipe(writableStreamStyles);
    }
  } catch (e) {
    console.log(e);
  }
}

const getInfoOfItems = async (path) => {
  try {
    const files = await readdir(path, { withFileTypes: true });
    return files;
  } catch (e) {
    console.log(e);
  }
}

const copyFiles = async (path, pathCopy) => {
  try {
    await mkdir(pathCopy, { recursive: true });
    const nameFiles = await getInfoOfItems(path);
    for (const item of nameFiles) {
      const copyItemPath = resolve(pathCopy, item.name);
      const itemPath = resolve(path, item.name);
      if (item.isDirectory()) {
        await copyFiles(itemPath, copyItemPath);
      } else {
        await copyFile(itemPath, copyItemPath);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

const getHTML = async () => {
  const HTMLWritableStream = createWriteStream(bundleHTMLPath);
  let mainHTML = await readFile(HTMLPath, { encoding: 'utf-8'});
  const templates = await getInfoOfItems(componentsPath);
  const templatesData = [];
  let result = mainHTML.toString().trim();
  for (const file of templates) {
    const filePath = resolve(componentsPath, file.name);
    const dataOfFile = await readFile(filePath, { encoding: 'utf-8' });
    const fileName = basename(file.name, extname(file.name));
    templatesData.push({ name: fileName, data: dataOfFile});
    const regexp = new RegExp(`[{]{2}${fileName}[}]{2}`);
    result = result.replace(regexp, dataOfFile);
  }
  HTMLWritableStream.write(result);
}

const buildProjectFunc = async () => {
  const buildFolder = await mkdir(bundleFolderPath, { recursive: true });
  await getStylesFiles(stylesPath);
  await copyFiles(assetsPath, assetsBundlePath);
  await getHTML();
}

buildProjectFunc();