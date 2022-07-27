const db = require('../helpers/dbcon.js');



console.log(db.isFullMatch("boy, girl    , last, know", "girl"));