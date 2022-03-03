const db = require("../helpers/dbcon");

constWords = ['barvo', "l'ultimo", "quest'anno"];



const rawText = `ntrambe le parti. Mosca non è formalmente parte nel conflitto e quindi non si sente vincolata. Mentre le autorità di Kiev, su pressione della frangia nazionalista del Paese, non riescono a concedere l'autonomia ai separatisti. Ed il conflitto è quindi destinato a proseguire.



Il Donbass e la sua importanza`;

function testSplit(){
    splitArr = rawText.split(/[\s+]/);
}

testSplit();
