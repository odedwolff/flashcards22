const selectNextWord = function (stats, doRevSearch) {
    // console.log(`stats=${JSON.stringify(stats)}`);
    var wordKeys = Object.keys(stats.wordInfoDict);
    //calculate total words weight 
    var totalWeight = 0;
    for (var i = 0; i < wordKeys.length; i++) {
        var row = stats.wordInfoDict[wordKeys[i]];
        if (checkSuspended(row)) {
            row['weight'] = 0;
        } else {
            const expFactor = row['attempts'] / row['correct'];
            row['weight'] = expFactor * row['instances_cnt'];
        }
        totalWeight += row['weight'];
    }

    /**
    * what takes place here is seleciton of a word randomely, where each word has a probablilty 
    * to get selected porportional to its weight field. that is, a words with weight w1 has a w1/w2 
    * prob. to get selected compared with a word with weight w2
    * the info in each word entry is specific to each user, based on thier performace, as well as universal stats of word 
    * 
    * ALGORITHM- 
    *    weightSum <= sum(weights of all words)
    *    target  <= uniformy random in (0:weightSum)
    *    accumlative sum <= 0
    *    while words[i] in words:
    *      wordRange <= (accumlative sum, accumlative sum + words[i].weight)
    *      if traget inside wordRange 
    *          return  words[i]
    *      else
    *          accumlative sum <= accumlative sum + words[i].weight
    * 
    */

    var spectrumUpperLimit = 0;
    const target = Math.random() * totalWeight;
    //console.log(`random selection target: ${target}`);

    for (var i = 0; i < wordKeys.length; i++) {
        var row = stats.wordInfoDict[wordKeys[i]];
        spectrumUpperLimit += row['weight'];
        //console.log(`row: ${JSON.stringify(row)} current word spectrum limit: ${spectrumUpperLimit}`);
        if (spectrumUpperLimit > target) {
            //console.log('HIT!!')
            if (doRevSearch) {
                row['mainTrx'] = extractMainTrx(row['translation']);
                row['similars'] = backSearch(row['mainTrx']);
            }
            return row;
        }
    }
    throw "ERROR- word selection incsositant";
}

//retreives all rows whos full translation contains the given main Trx 
//TODO- consider searching in mainTrx field rather than full tanslation 
//returns a coma sperated string contains all retreived source words 
function backSearch(mainTrx) {
    var matchesStr = "";
    var wordKeys = Object.keys(stats.wordInfoDict);
    for (var i = 0; i < wordKeys.length; i++) {
      var row = stats.wordInfoDict[wordKeys[i]];
      //for each word, first see if a loose match exists, then verify match more precisely 
      if (row['translation'].search(mainTrx) > -1 && isFullMatch(row['translation'], mainTrx)) {
        matchesStr += (", " + row['word']);
      }
    }
    return matchesStr;
  }

  function extractMainTrx(fullTrx){
    //TODO - consider also dedicated main trx field 
    return fullTrx.split(',')[0].trim();
  }
  