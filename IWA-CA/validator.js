var express = require('express'),//already on app.js
var router = express(),//already on app.js
var check = require('express-validator'),//already on app.js
var validationResult = require('express-validator');//already on app.js

router.use(express.json())//already on app.js

router.post('/form', function (req, res) {//already on app.js
  var title  = req.body.title
  var genre = req.body.genre
  var director = req.body.director
  var year = req.body.year
  var duration = req.body.duration
  var comments = req.body.comments
})


router.post('/form',function (req, res) {//already on app.js

function validateInput(obj){
  check('title')
  .isAlphanumeric()
  .withMessage("Make sure you type letters or numbers, only")
  .isEmpty()
  .withMessage("Make sure to type the title"),
  check('genre')
  .isAlpha()
  .withMessage("Make sure you type letters, only")
  .isEmpty()
  .withMessage("Make sure to type the genre"),
  check('director')
  .isAlpha()
  .withMessage("Make sure you type letters, only")
  .isEmpty()
  .withMessage("Make sure to type the director"),
  check('year')
  .isNumeric()
  .withMessage("Make sure to type numbers, only")
  .isEmpty()
  .withMessage("Make sure to type the year"),
  check('duration')
  .isAlphanumeric()
  .withMessage("Make sure you type letters or numbers, only")
  .isEmpty()
  .withMessage("Make sure to type the duration"),
  chech('comments')
  .isAlphanumeric()
  .withMessage("Make sure to type letters or numbers,only")


  var errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
}
  
})
