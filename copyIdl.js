const fs = require("fs");
const idl = require("./target/idl/solana_twitter.json");

fs.writeFileSync("./app/src/idl.json", JSON.stringify(idl));