const mongoose = require("mongoose");

function connectDataBase() {
  mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Data Base is connect");
  });
}



module.exports = connectDataBase;
