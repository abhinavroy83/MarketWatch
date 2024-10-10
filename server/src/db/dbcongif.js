const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectiondb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb sucessfully");
  } catch (error) {
    console.log("Error during conneting to database", error);
    process.exit(1);
  }
};


module.exports = connectiondb;