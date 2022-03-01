const fs = require('fs');
const path = require('path');


const RAW_DATA_FOLDER = '../raw_language_data/italian'

/***
 * rawDataFolder is a fodler containing .txt files for hervesting stats 
 */

exports.build_database = function(){
    fs.readdir(path.join(__dirname,RAW_DATA_FOLDER), (err, files) => {
        files.forEach(processFile);
      });
}


function processFile(filename){
  const fullAame = 'proj_root/raw_language_data/italian/' + filename;
  //const filePath = path.join(__dirname, filename);
  fs.readFile(fullAame, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return;
    }
    console.log(data)
  })
}