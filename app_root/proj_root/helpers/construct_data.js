const fs = require('fs');
const db = require('./dbcon.js');
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
    //console.log(data);
    const stats = count(data);
    db.saveBatch(stats);
  })
}

function count(rawText){
  //const words = rawText.split(" ");
  const words = rawText.split(/[\s+]/);
  var counter ={};
  for (var i = 0 ; i < words.length;i++){
      key = words[i];
      if(key.length < 1){
        continue;
      }
      if(key in counter){
          counter[key]++
      }else{
           counter[key] = 1;
      }

      //console.log(wrods[i] + "\n" + i);
  }
  console.log(`wrods count: ${counter}`);
  return counter; 
}  



/**
 * database from frequency list in the form of a text file
      freq1      word1
      freq2      word2
 */
exports.buildFromTextFile = function(file){

}