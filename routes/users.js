var express = require('express');
var router = express.Router();
const models = require('../models')


router.get('/', async function(req, res, next) {
  try{
  const users = await models.User.findAll({include: models.Todo });
  res.json(users)
  }catch(err){
    console.log("failed", err)
    res.json({err})
  }
});

router.post('/', async function(req, res, next){
  try{
    const {name} = req.body
    console.log(req.body)
    const user = await models.User.create({
       name
  });
    res.json(user)
  }catch(err){
    console.log("failed", err)
    res.json({err})

  }
})

router.put('/:id', async function(req, res, next){
  try{
    const {name} = req.body
    console.log(name)
    const user = await models.User.update({name}, {
      where: {
        id: req.params.id
      }
    })
   
    res.json(user)
  }catch(err){
    console.log("failed", err)
    res.json({err})

  }
})

router.delete('/:id', async function(req, res, next){
  try{
    const {name} = req.body
    const user = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  }catch(err){
    console.log("failed", err)
    res.json({err})

  }
})

module.exports = router;
