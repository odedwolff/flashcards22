
const state = {
  isConnected:false,
  connection:null,
}

const stats = {
  wordsInfo:null,
  wordInfoDict:null,
  normalizer:10,
  totalInstCount:0
}


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
  var sql = "INSERT INTO `test_schema_17_oct`.`test_table_1` (`str_val1`, `num_val1`) VALUES ('57', '23325');";

  state.connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted after POST");
  });
}



 function updateWord(word, count){
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
  //var out = word1.replace(/[|,|:|"|.|?|!|l']/g, "");
  var out = word1.replace(/[|,|:|"|.|?|!|l'|(|)|»|«|\d]/g, "");


  return out; 
}


/**load words from frequency table, joined by a stat node for the user, if such exists  */
exports.loadScore = function (res) {
    console.log("entering loadScore()")

    const sql = `select * from 
         test_schema_17_oct.score as scr right join 
          test_schema_17_oct.words_stats as lex 
          on scr.word = lex.id`;              
  state.connection.query(sql, function (err, result) {
    if (err){
      res.sendStatus(500);
       throw err;
    }
    console.log("info loaded");
    stats.wordsInfo = result;
    //convert reults to dictionary, find maxCount for normalization 
    stats.wordInfoDict = {};
    var key, value;
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      key = row['id'];
      value = row; 
      //if there are no user score recordsd for the row, fill in initial fake values
      // (we don't start at 0,0 because the math is nastier, but everything's still
      // consistant this way 
      if(!row['attempts']){
        row['attempts'] = DEFAULT_ATTEMPTS_CORRECT_RATIO.attempts;
        row['correct'] = DEFAULT_ATTEMPTS_CORRECT_RATIO.correct;
      }
      stats.wordInfoDict[key] = value;
      stats.totalInstCount += row.instances_cnt;
    });

    //console.log(`stats.wordInfoDict after asignment= >>>>> ${JSON.stringify(stats.wordInfoDict)} <<<<<`);
    res.sendStatus(200);

  });
}


exports.selectNextWord = function (){
 // console.log(`stats=${JSON.stringify(stats)}`);
  var wordKeys = Object.keys(stats.wordInfoDict);
  //calculate total words weight 
  var totalWeight = 0; 
  for(var i = 0 ; i < wordKeys.length ; i++){
    var row = stats.wordInfoDict[wordKeys[i]];
    const expFactor = row['attempts'] / row['correct'];
    row['weight'] = expFactor * row['instances_cnt'];
    totalWeight += row['weight'];
  }

  var spectrumUpperLimit = 0;
  const target = Math.random() * totalWeight;
  console.log(`random selection target: ${target}`);
  
  for(var i = 0 ; i < wordKeys.length ; i++){
    var row = stats.wordInfoDict[wordKeys[i]];
    spectrumUpperLimit += row['weight'];
    console.log(`row: ${JSON.stringify(row)} current word spectrum limit: ${spectrumUpperLimit}`);
    if(spectrumUpperLimit > target){
      console.log('HIT!!')
      return row;
    }
  }
  throw "ERROR- word selection incsositant";
}

function score(freq, attempts, correct){
  //console.log(`entering score(freq=${freq}, attempts=${attempts}, correct=${correct})`);
  var scoreFactor;
  const expFactor = attempts / correct;     
  const res = freq * expFactor * Math.random();
  console.log(`\nnon random score: ${freq * expFactor} toal score = ${res}`);
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



exports.updateScore = function (wordId, isCorrect, res) {
  updateScoreDb(wordId, isCorrect, res);
  updateScoreLocal(wordId, isCorrect);
}

function updateScoreLocal(wordId, isCorrect){
  const inc = isCorrect ? 1 : 0;
  const wordEntry = stats.wordInfoDict[wordId];
  if (!wordEntry) {
    throw 'no entry for word ${wordId}';
  }
  if (!wordEntry['attempts']) {
    DEFAULT_ATTEMPTS_CORRECT_RATIO.attempts;
  }
  if (wordEntry['correct']) {
    DEFAULT_ATTEMPTS_CORRECT_RATIO.correct;
  }
  wordEntry['attempts']++;
  wordEntry['correct'] += inc;
}

function updateScoreDb(wordId, isCorrect, res){
  const inc = isCorrect ? 1 : 0;
  const sql = `CALL test_schema_17_oct.upateSCore(${wordId}, ${inc},${DEFAULT_ATTEMPTS_CORRECT_RATIO.attempts}, ${DEFAULT_ATTEMPTS_CORRECT_RATIO.correct})`;
  state.connection.query(sql, (error, results, fields) => {
    if (error) {
      if (res)
        {
          res.sendStatus(500);
        }
      return console.error(error.message);
    }
    console.log('Rows affected:', results.affectedRows);
    if (res)
      {
      res.sendStatus(200);
      }
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