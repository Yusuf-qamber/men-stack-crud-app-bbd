const express = require("express");
const router = express.Router();
const Business = require("../models/business");

router.get("/", async (req, res) => {
  const allBusinesses = await Business.find();
  console.log("allBusinesses: ", allBusinesses);
  res.render("businesses/index.ejs", { allBusinesses: allBusinesses });
});

//RENDER NEW BUSINESS FORM
router.get("/new", (req, res) => {
  res.render("businesses/new.ejs");
});

// POST FORM DATA TO DATABASE

router.post("/", async (req, res) => {
  if (req.body.isVerified === "on") {
    req.body.isVerified = true;
  } else {
    req.body.isVerified = false;
  }
  console.log(req.body);
  await Business.create(req.body);
  res.redirect("businesses/new");
});

//SHOW ONE BUSINESS
router.get("/:businessId", async (req, res) => {
  console.log("Prams: ", req.params.businessId);
  const foundBusiness = await Business.findById(req.params.businessId);
  res.render("businesses/show.ejs", { foundBusiness: foundBusiness });
});

router.delete("/:businessId", async (req, res) => {
  await Business.findByIdAndDelete(req.params.businessId);
  res.send("This is the delete route");
});

// GET /businesses/:businessId/edit
// controller function should render 'businesses/edit.ejs' <--- ejs file should have edit form

router.get("/:businessId/edit", async (req, res) => {
  const foundBusiness = await Business.findById(req.params.businessId);
  // console.log(foundBusiness);
  res.render("businesses/edit.ejs", { foundBusiness: foundBusiness });
});

//PUT for submitting the form
router.put("/:businessId", async (req, res) => {
  console.log(req.body);

  if (req.body.isVerified === "on") {
    req.body.isVerified = true;
  } else {
    req.body.isVerified = false;
  }
  console.log(req.body);
  await Business.findByIdAndUpdate(req.params.businessId, req.body);
  res.redirect(`/businesses/${req.params.businessId}`);
});

module.exports = router;
