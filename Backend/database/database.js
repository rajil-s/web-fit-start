const mongoose = require("mongoose");

const connectDatabase = async () => {

  mongoose.connect(process.env.MONGODB_CLOUD).then(() => {

    console.log("Database connected to " + process.env.MONGODB_CLOUD);
  })
};

module.exports = connectDatabase;