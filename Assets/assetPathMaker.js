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

// var files = getAllFiles('./Assets/Images').concat(getAllFiles('./Assets/Audio'));
// var files = getAllFiles('./Assets/Images')
var files = getAllFiles('./Assets/Audio')

var filtered = files.filter(file => !file.includes('DS_Store') && !file.includes('.avif'))

fs.writeFile('./Assets/allAssetsAudio.txt', filtered.map((item) => '"' + item + '",').join('\n'), err => {
  if (err) {
    console.error(err);
    return;
  }
});