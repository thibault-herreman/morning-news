var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var uid2 = require("uid2");

var userModel = require("../models/users");

router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveUser = null;
  var token = "";

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (
    req.body.usernameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    error.push("champs vides");
  }

  const cost = 10;
  const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

  if (error.length == 0) {
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
      language: "fr",
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, token, error });
});

router.post("/addToDb", async function (req, res, next) {
  await userModel.updateOne(
    { token: req.body.token },
    { language: req.body.language }
  );

  res.json();
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var error = [];
  var token = "";

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    const user = await userModel.findOne({
      email: req.body.emailFromFront,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        language = user.language;
        token = user.token;
        console.log("language to front :", language);
        res.json({ result, token, language });
      } else {
        error.push("mot de passe incorrect");
        res.json({ error });
      }
    } else {
      error.push("email ou mot de passe incorrect");
      res.json({ error });
    }
  } else {
    res.json({ error });
  }
});

router.post("/wishlist-article", async function (req, res, next) {
  var article = req.body.article;
  var articleParse = JSON.parse(article);

  var user = await userModel.findOne({ token: req.body.token });

  const articleExist = user.wishlist.find(
    (element) => element.title === articleParse.title
  );

  if (articleExist === undefined) {
    user.wishlist.push({
      title: articleParse.title,
      description: articleParse.description,
      urlToImage: articleParse.urlToImage,
      language: req.body.language,
    });
  }

  var saveUser = await user.save();

  var result = false;
  if (saveUser) {
    result = true;
  }

  res.json({ result });
});

router.delete(
  "/wishlist-article/:title/:token",
  async function (req, res, next) {
    console.log("tokenDelete", req.params.token);

    var user = await userModel.findOne({ token: req.params.token });

    const articleIndex = user.wishlist.findIndex(
      (element) => element.title === req.params.title
    );

    var returnDb = user.wishlist.splice(articleIndex, 1);

    var saveUser = await user.save();

    var result = false;
    if (returnDb.deletedCount == 1) {
      result = true;
    }

    res.json({ result });
  }
);

router.post("/wishlist-article-view/", async function (req, res, next) {
  var user = await userModel.findOne({ token: req.body.token });

  var articlesWhishlist = user.wishlist.filter((article)=> article.language === req.body.language)

  res.json({ articlesWhishlist });
});

module.exports = router;
