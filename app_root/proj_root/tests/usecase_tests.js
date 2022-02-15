const db = require('../helpers/dbcon.js');



exports.test1 = function(res){
    testBasicCycleRepeaet(4, res);
}

exports.test2 = function(res){

}

exports.test3 = function(res){

}



/**
 * run when server is up, running and ready
 */
testBasicCycleRepeaet = function(repeats, res){
    for (var i = 0; i < repeats; i++) {
        const nextWrodRow = db.selectNextWord();
        const isCorrect = Math.random() > 0.5;
        const wordId = nextWrodRow['word'];
        db.updateScore(wordId, isCorrect, res);
    }
    
}