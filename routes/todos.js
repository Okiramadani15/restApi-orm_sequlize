var express = require("express");
var router = express.Router();
const models = require("../models");
const { tokenValid } = require("../helpers/utils");

router.get("/", tokenValid, async function (req, res, next) {
  try {
    const todos = await models.Todo.findAll({include: models.User });
    res.json(todos);
  } catch (err) {
    console.log("failed", err);
    res.json({ err });
  }
});

router.post("/",tokenValid, async function (req, res, next) {
  try {
    const { title} = req.body;
    console.log(req.body);
    const todo = await models.Todo.create({
      title,
      executor: req.user.userid
    });
    res.json(todo);
  } catch (err) {
    console.log("failed", err);
    res.json({ err });
  }
});

router.put("/:id",tokenValid, async function (req, res, next) {
  try {
    const { title, complete } = req.body;
    const todo = await models.Todo.update(
      { title, complete },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json(todo);
  } catch (err) {
    console.log("failed", err);
    res.json({ err });
  }
});

router.delete("/:id",tokenValid, async function (req, res, next) {
  try {
    const { name } = req.body;
    const todo = await models.Todo.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(todo);
  } catch (err) {
    console.log("failed", err);
    res.json({ err });
  }
});

module.exports = router;
