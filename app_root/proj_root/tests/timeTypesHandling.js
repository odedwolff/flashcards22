

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
        testInsertSuspensionEnd(con);
      });  
}(mysql);




function testInsertSuspensionEnd(con) {
    const now = new Date();
    //set this ed-hock 
    const wordId = 6008;
    //set the time to the end of suspention  
    now.setTime(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const sus_end = now.toISOString().slice(0, 19).replace('T', ' ');
    const sql=`UPDATE test_schema_17_oct.score SET suspend_until =  "${sus_end}" WHERE (word = ${wordId})`;
    console.log(`abut to execute query: ${sql}`);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`called update successfully update rows:${result.affectedRows}`);
        process.exit();
    });
}