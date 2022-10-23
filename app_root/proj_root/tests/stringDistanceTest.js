const util = require('../public/distance.js');


//expect 0
console.log(util.minDistance(['one', 'two', 'three'], 'one'));

//expect 3
console.log(util.minDistance(['one', 'two', 'three'], 'zero'));

//expect 1
console.log(util.minDistance(['one', 'two', 'three'], 'twu'));

//expect 2
console.log(util.minDistance(['one'], 'off'));



