const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Participant = require('../models/participant');
const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('../config');


router.post('/signup', (req, res, next) => {
  // extract the info we need from the body of the request
  const { email, firstName, lastName, password, city, bootcampName } = req.body;
  console.log('DEBUG { email, firstName, lastName, password, city, bootcampName }', { email, firstName, lastName, password, city, bootcampName });
  const user = new User({
    email,
    firstName,
    lastName,
    password
  });

  User.register(user, password)
    .then(docUser => {
      let initialExercises = [{
        name: 'GitHub',
        link: '',
        status: 'TODO',
        shortFeedback: ''
      },{
        name: 'Ironskydive',
        link: '',
        status: 'TODO',
        shortFeedback: ''
      },{
        name: 'NPM Clone (optional)',
        link: '',
        status: 'TODO',
        shortFeedback: ''
      },{
        name: 'Mars Rover',
        link: '',
        status: 'TODO',
        shortFeedback: ''
      }]
      
      let initialMessages = [{
        text: `Hey ${firstName}! Welcome on this PreWork follow-up platform! It was built by your (awesome) teachers so they can easily check your progression through the PreWork.
You will find at the top of this page a recap of your progression.
Right below, there is a chat so you can talk to any of your teachers. 
This platform is not perfect at all, it was built by me in a couple of days.
The good news is that you would be able to code the same thing in few days by the end of the bootcamp! 
Good luck with the PreWork!`,
        date: new Date(),
      }]

      return Participant.create({
        _user: docUser._id,
        bootcampName,
        city,
        exercises: initialExercises,
        messages: initialMessages
      })
    })
    .then(_ => res.json({success: true}))
    .catch(err => next(err))
});

router.post('/login', (req, res, next) => {
  const authenticate = User.authenticate();
  const { email, password } = req.body;
  // check if we have a email and password
  if (email && password) {
    // test if the credentials are valid
    authenticate(email, password, (err, user, failed) => {
      if (err) {
        // an unexpected error from the database
        return next(err);
      }
      if (failed) {
        // failed logging (bad password, too many attempts, etc)
        return res.status(401).json({
          error: failed.message,
        });
      }
      if (user) {
        // success!! Save the user id
        // NEVER save the password here
        // the id is usually enough because we can get back
        // the actual user by fetching the database later
        const payload = {
          id: user.id,
        };
        // generate a token and send it
        // this token will contain the user.id encrypted
        // only the server is able to decrypt it
        // for the client, this is just a token, he knows that
        // he has to send it
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          token,
          _id: user.id,
          isAdmin: user.isAdmin
        });
      }
    });
  } else {
    // unauthorized error
    res.sendStatus(401);
  }
});

// Example of secret route
// If you use Postman, don't forget to add "Authorization" "Bearer <your-JWT>" (without "<" and ">")
router.get('/secret', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  res.json({
    answerToLifeTheUniverseAndEverything: 42,
    user: req.user
  });
});

module.exports = router;