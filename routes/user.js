// const { response } = require("express");
var express = require("express");
var router = express.Router();
var productHelper = require("../helpers/product-helpers.js");
var userHelper = require("../helpers/user-helper.js");

/* GET home page. */

const loginValidator = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/", loginValidator, function (req, res, next) {
  let user = req.session.user;
  productHelper.getAllProducts().then((products) => {
    res.render("user/user-view-products", { products, user });
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("user/login", { loginErr: req.session.logginErr });
    req.session.logginErr = null;
  }
});

router.get("/signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("user/signup");
  }
});

router.post("/signup", (req, res) => {
  userHelper.doSignup(req.body).then(() => {
    res.redirect("/login");
  });
});

router.post("/login", (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      req.session.logginErr = false;
      // console.log(req.session);
      res.redirect("/");
    } else {
      req.session.logginErr = response.logginErr;
      res.redirect("/login");
    }
  });
});

router.get('/about',(req,res)=>{
  res.render('user/about');
})

router.get('/products',(req,res)=>{
  res.redirect('/')
})


router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
