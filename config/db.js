const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection
    .once("open", function () {
      console.log("MongoDB Connected.");
    })
    .on("error", function () {
      console.log("MongoDb Connection Failed.");
    });
};

module.exports = connectDB;
