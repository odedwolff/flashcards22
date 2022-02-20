const db = require('../helpers/dbcon.js');



exports.test1 = function(res){
    res.sendStatus(200);
    testBasicCycleRepeaet(1000, null);
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
        const wordId = nextWrodRow['id'];
        db.updateScore(wordId, isCorrect, res);
    }
    
}