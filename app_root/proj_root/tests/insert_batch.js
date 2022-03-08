

var mysql = require('mysql');

connect = function(mysql){
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
        console.log("Connected!");
        insertBatchTest(con);
      });  
}(mysql);


function insertBatchTest(con) {
    var sql = "INSERT INTO test_schema_17_oct.words (frequency, word) VALUES ?";
    var values = [
        [23232,'word1'],
        [21292,'word2'],
        [31221,'word3'],
        [32213,'word4']
    ];
    con.query(sql, [values], function (err) {
        if (err) throw err;
        console.log("insert done");
        con.end();
    });
}

