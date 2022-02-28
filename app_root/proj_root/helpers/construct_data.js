const fs = require('fs');
const path = require('path');


const RAW_DATA_FOLDER = '../raw_language_data/italian'

/***
 * rawDataFolder is a fodler containing .txt files for hervesting stats 
 */

exports.build_database = function(){
    fs.readdir(path.join(__dirname,RAW_DATA_FOLDER), (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
      });
}