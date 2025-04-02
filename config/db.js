const mongoose = require("mongoose");
require('dotenv').config()

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://sanchayan:h0rO1eGUIZdTFU2o@cluster0.gfvjh.mongodb.net/project";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useFindAndModify", false);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
