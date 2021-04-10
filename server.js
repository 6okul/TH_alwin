require("dotenv").config({ path: "./config.env" });
const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

connectDB();

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
