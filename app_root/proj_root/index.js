// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

var bdPars = require('body-parser')

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "5000";


/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

var jsonParser = bdPars.json();
app.use(jsonParser);

//app.use(express.bodyParser());


/**
 * Routes Definitions
 */
/* app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
}); */

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

app.get("/user", (req, res) => {
    res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
  });

app.get("/text_in", (req, res) => {
    res.render("slv_stat_enter_text", {});
  });

app.post('/testAjax', jsonParser, (req, res) => {
    console.log("got ajax request");
    console.log(req.body.text);
    const count = req.body.counter;
    console.log(JSON.stringify(count));
   
    console.log("iterated keys:")
    for (const [key, value] of Object.entries(count)) {
      console.log(key, value);
    }

    //db.testInsert();
    //db.updateWord(null);
    db.saveBatch(count);
    res.sendStatus(200);
  });


  app.post("/testLoadScore", (req, res) => {
    db.loadScore();
    //res.sendStatus(200);
  });

  app.post("/testUpdateScore", (req, res) => {
    db.testUpdateScore();
    //res.sendStatus(200);
  });


  app.post("/updateCorrect", jsonParser, (req, res) => {
    const wordId = req.body.wordId;
    const correct = req.body.correct;
  
    console.log(`updateCorrect(), extracted params: wordId=${wordId} correct=${correct}`);
    db.updateScore(wordId, correct);
    //db.updateScore();
    //res.sendStatus(200);
  });

  


  app.post("/testSelectNextWord", (req, res) => {
    //db.testSelectWord();
    const nextWordInfo = db.selectNextWord();
    res.json({selectedWordInfo: nextWordInfo});
  });

  app.post("/testUpdateScoreStoredP", (req, res) => {
    db.testUpdateScoreStoredP();
  });
  




  




/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

db = require('./helpers/dbcon.js');
var mysql = require('mysql');
db.connect(mysql);


