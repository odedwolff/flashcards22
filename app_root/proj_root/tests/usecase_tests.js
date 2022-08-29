const db = require('../helpers/dbcon.js');



/* exports.test1 = function(res){
    res.sendStatus(200);
    testBasicCycleRepeaet(1000, null);
} */

exports.test = function(res){
    res.sendStatus(200);
    //console.log("!!test2 disabled temporarely for safety");
    select1(100000);
}





/**
 * run when server is up, running and ready
 */
testBasicCycleRepeaet = function(repeats, res){
    for (var i = 0; i < repeats; i++) {
        const nextWrodRow = db.selectNextWord();
        const isCorrect = Math.random() > 0.5;
        const wordId = nextWrodRow['id'];
        db.updateScore(wordId, isCorrect, res);
    }
    
}

function select1(nmWords){
    console.log("entering test select1()");
    const stats = {};
    for(var i = 0 ; i < nmWords ; i++){
        const nextWrodRow = db.selectNextWord();
        const wordId = nextWrodRow['id'];
        if(!stats[wordId]){
            stats[wordId] = 1; 
        }else{
            stats[wordId] += 1;
        }
    }
    console.log(`stats:\n ${JSON.stringify(stats)}`);
   
} 