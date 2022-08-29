const db = require('../helpers/dbcon.js');



function select1(nmWords){
    const stats = {};
    const nextWrodRow = db.selectNextWord();
    const wordId = nextWrodRow['id'];
    for(var i = 0 ; i < nmWords ; i++){
        if(!stats[wordId]){
            stats[wordId] = 1; 
        }else{
            stats[wordId] += 1;
        }
    }
    console.log(`stats:\n ${stats}`);
   
} 