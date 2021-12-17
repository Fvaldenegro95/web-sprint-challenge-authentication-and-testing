const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Jokes = require('../jokes/jokes-model');
const { checkUsernameExists, checkPayload, checkUserInDB } = require('../middleware/middleware');


router.post('/register', checkPayload, checkUserInDB, async (req, res) => {
  try{
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(req.body.password, rounds)
  const newUser = await Jokes.add({id: req.body.id, username: req.body.username, password: hash})

  res.status(201).json(newUser)
  } catch(e) {
    res.status(500).json({message: e.message})
    
  }

});

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
 let {username, password} = req.body

 Jokes.findByUserName({username})
 .then(([user]) => {
   if(user && bcrypt.compareSync(password, user.password)){
     const token = makeToken(user)
     res.status(200).json({
       message: `welcome ${user.name}`,
       token
     })
   } else {
      res.json({
        message: "username and password required"
      })
   }

  
   
 })
});


function makeToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '500s'
  }

  return jwt.sign(payload, jwt, options)
}

module.exports = router;