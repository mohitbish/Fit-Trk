const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
require("dotenv").config();

const Routes = require("./Routes");

app.use(cors({origin: "https://fit-trk.onrender.com"}));
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/route", Routes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

