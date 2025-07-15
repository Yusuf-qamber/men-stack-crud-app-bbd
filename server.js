const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methedOverride = require("method-override");

//CONTROLLERS
const businessController = require("./controller/businessController");
const morgan = require("morgan");

//DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Conected to MongoDB${mongoose.connection.name}`);
});

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methedOverride("_method"))
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//ROUTE

app.use("/businesses", businessController);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
