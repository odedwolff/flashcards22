//const exp = require('constants');
//var mysql = require('mysql');

const state = {
  isConnected:false,
  connection:null,
}

const stats = {
  wordsInfo:null,
  wordInfoDict:null,
  normalizer:10
}

//const DEFAULT_ATTEMPTS_CORRECT_RATIO = 10 / 5;

const DEFAULT_ATTEMPTS_CORRECT_RATIO = 
  {
    attempts:10,
    correct:5
  }

const MIN_ATTEMPTS_THR = 5;

exports.connect = function(mysql){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root"
      });
      
      con.connect(function(err) {
        if (err) {
            console.log("Error on connection!");
            throw err;
        }

        state.isConnected = true;
        state.connection = con;
        console.log("Connected!");
        //testWriteRow(con);

      });  
}

exports.isConnected = ()=>state.isConnected; 



function testWriteRow(concection) {
  var sql = "insert into test_schema_17_oct.test_table_1 values(15, 'str23324', -15);";
  concection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}


exports.testInsert =  function() {
  //var sql = "insert into test_schema_17_oct.test_table_1 values(101, 'str23324', -101);";
  var sql = "INSERT INTO `test_schema_17_oct`.`test_table_1` (`str_val1`, `num_val1`) VALUES ('57', '23325');";

  state.connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted after POST");
  });
}



 function updateWord(word, count){
    //var sql = `CALL test_schema_17_oct.inc_word('${word}', ${count})`;
    if(word === undefined){
      console.log("undefined word, skipped");
      return; 
    }
    var prcWord = processWord(word);
    var sql = `CALL test_schema_17_oct.inc_word("${prcWord}", ${count})`;
    console.log("SQL = " + sql);

    state.connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("called stoed proceedure successfully");
    });
}


exports.saveBatch = function(count){
  for (const [key, value] of Object.entries(count)) {
    //console.log(key, value);
    console.log(`sending database update ${key} -> ${value})`);
    updateWord(key, value)
  }
}

function processWord(word1){
  console.log(`process word(${word1}), type= ${typeof word1}`);
  var out = word1.replace(/[|,|:|"|.|?|!|l']/g, "");
  //var out = word1.replace(/[|,|:|"|.|?|!|"l'"]/g, "");


  return out; 
}


/**load words from frequency table, joined by a stat node for the user, if such exists  */
exports.loadScore = function () {
   /* const sql = `select * from 
                 test_schema_17_oct.score as scr inner join 
                 test_schema_17_oct.words_stats as lex 
                 on scr.word = lex.id`; */

    const sql = `select * from 
         test_schema_17_oct.score as scr right join 
          test_schema_17_oct.words_stats as lex 
          on scr.word = lex.id`;              
  //const sql = "select * from test_schema_17_oct.score";
  state.connection.query(sql, function (err, result) {
    if (err) throw err;
    stats.wordsInfo = result;
    console.log(`stats.wordsInfo after asignment= >>>>> ${JSON.stringify(stats.wordsInfo)} <<<<<`);
    var maxInstanceCount = -1;
    // console.log(`got results ${result} ,type=${typeof result}`);
    //console.log("result:" + result);

    //convert reults to dictionary, find maxCount for normalization 
    stats.wordInfoDict = {};
    var key, value;
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      key = row['id'];
      value = row; 
      stats.wordInfoDict[key] = value;
      console.log(row);
      if(row.instances_cnt > maxInstanceCount){
        maxInstanceCount = row.instances_cnt;
      }
    });

    console.log(`stats.wordInfoDict after asignment= >>>>> ${JSON.stringify(stats.wordInfoDict)} <<<<<`);


  });
}

exports.testSelectWord = function(){
  const out = selectNextWord();
  console.log(`selected row = ${JSON.stringify(out)}`);
}

exports.selectNextWord = function (){
  var bestWordKey = null;
  var bestWordScore = -1;
 // console.log(`stats=${JSON.stringify(stats)}`);
  Object.keys(stats.wordsInfo).forEach(function (key) {
    var row = stats.wordsInfo[key];
    var curScore = score(row.instances_cnt / stats.normalizer, row.attempts, row.correct);
    console.log(`current word Info ${JSON.stringify(row)}, its score ${curScore}, best score so far ${bestWordScore}`);
    console.log("<<------------------------------------------------------------------------------>>");
    if (!bestWordKey || curScore > bestWordScore){
       bestWordKey = key;
       bestWordScore = curScore;
    }  
  });
  return stats.wordsInfo[bestWordKey];
}

function score(freq, attempts, correct){
  console.log(`entering score(${freq}, ${attempts}, ${correct})`);
  var scoreFactor;
  if(!attempts || attempts < MIN_ATTEMPTS_THR){
    scoreFactor = DEFAULT_ATTEMPTS_CORRECT_RATIO; 
  }else{
    scoreFactor = attempts / correct + 1;
  }
  const res = freq * scoreFactor * Math.random();
  console.log(`calculsted score = ${res}`);
  return res;
}


function updateLocalStats(wordId, isCorrect){
  var row = stats.wordInfoDict[wordId];
  if (row)
    {
      row['attempts']++;
      if(isCorrect)
        {
          row['correct']++
        }
    }
}

exports.updateScore = function(wordId, isCorrect){
  //update score set correct = correct + 1 , attempts = attempts + 1  where id = 2;
  const sql1 = "update test_schema_17_oct.score set attempts = attempts + 1 ";
  const sql2 = isCorrect? ", correct = correct + 1 " : "";
  const sql3 = `where word = ${wordId}`;
  const sql = sql1 + sql2 + sql3;
  updateLocalStats(wordId, isCorrect);

  state.connection.query(sql, (error, results, fields) => {
    if (error){
      return console.error(error.message);
    }
    console.log('Rows affected:', results.affectedRows);
  });
}


exports.testUpdateScore = function(){
  updateScore(1200,false);
}


exports.testUpdateScoreStoredP = function(){
  const sql = `CALL test_schema_17_oct.upateSCore(1901, 1, 31, 15)`;
  console.log("SQL = " + sql);
  state.connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("called stoed proceedure successfully");
});
}








 


 
exports.test = function(){console.log("testing test1")};  