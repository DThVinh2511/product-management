const mongoose = require("mongoose");

module.exports.connect = async () => {
  try{
    await mongoose.connect(process.env.MONG_URL);
    console.log("connect Success");
  }catch(error) {
    console.log("connect error");
  }
}

