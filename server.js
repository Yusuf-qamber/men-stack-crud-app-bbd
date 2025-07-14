const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");

//CONTROLLERS
const businessController = require("./controller/businessController");

//DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Conected to MongoDB${mongoose.connection.name}`);
});

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//ROUTE

app.use("/businesses", businessController);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
