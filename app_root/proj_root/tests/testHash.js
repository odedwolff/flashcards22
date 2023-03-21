const bcrypt = require('bcrypt');
async function f1() {
    passOrg = "pass1";
    passTry = "pass2";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passOrg, salt);
    console.log(`hashed password = ${hashedPassword}`)
    const isMatch = await bcrypt.compare(passTry, hashedPassword);
    console.log((isMatch?"": "no" )+ "match!");
}

f1();
