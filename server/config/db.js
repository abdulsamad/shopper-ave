/* eslint-disable no-console */
const mongoose = require("mongoose");

const databaseURI = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB Connected");
  } catch (err) {
    console.log(err.message);

    throw err;
  }
};

module.exports = connectDB;
