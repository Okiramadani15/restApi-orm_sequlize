var express = require("express");
var router = express.Router();
const models = require("../models");
const {generateToken} = require("../helpers/utils.js");

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) throw Error("user doesn't exist"); //Email or password wrong
    if (!user.checkPassword(password)) throw Error("password is Wrong"); //

    const token = generateToken({ userid: user.id });
    console.log('ini', token)

    res.json({
      success: true,
      data: {
        email: user.email,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
});

module.exports = router;
