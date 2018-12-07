const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Book = require('../models/bookModel');

const auth = require('.././middlewares/auth');

router.get('/auth', auth, (req, res) => {
  const {email, firstName, lastName, _id: id} = req.user;
  res.json({isAuth: true, email, firstName, lastName, id})
});

router.post('/register', (req, res) => {
  const {email, password, firstName, lastName} = req.body;
  new User({email, password, firstName, lastName})
      .generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie('auth', user.token).json({
          success: true,
          isAuth: true,
          user
        })
      })
});

router.post('/login', (req, res) => {
  const {email, password: plainPasswordFromUser} = req.body;

  User.findOne({email}, (err, user) => {
    if (!user) return res.json({isAuth: false, message: 'Wrong email'});

    user.comparePassword(plainPasswordFromUser, (err, isMatch) => {
      if (!isMatch) return res.json({isAuth: false, message: 'Wrong password'});

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        })
      })
    })
  })
});

router.get('/getReviewer', (req, res) => {
  let id = req.query.id;
  User.findById(id, (err, user) => {
    if (err) return res.status(400).send(err);
    res.json({
      firstName: user.firstName,
      lastName: user.lastName
    })
  })
});

router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

router.get('/posts', (req, res) => {
  let ownerID = req.query.userID;
  Book.find({ownerID})
      .then(docs => {
        res.send(docs)
      })
      .catch(e => {
        if (e) res.status(400).send(e);
      });
});

router.get('/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(user);
  });
});


module.exports = router;
