const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

var files = getAllFiles('./Assets/Images').concat(getAllFiles('./Assets/Audio'));
files = files.filter(file => !file.includes('DS_Store'))

fs.writeFile('./Scripts/allAssets.txt', files.join('\n'), err => {
  if (err) {
    console.error(err);
    return;
  }
});