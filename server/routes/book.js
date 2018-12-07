const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');

router.get('/', (req, res) => {
  const id = req.query.id;
  Book.findById(id, (err, book) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(book);
  })
});


router.get('/all', (req, res) => {
  console.log(req.url);
  let skip = parseInt(req.query.skip, 10);
  let limit = parseInt(req.query.limit, 10);
  let order = parseInt(req.query.order, 10);
  Book.find()
      .skip(skip)
      .limit(limit)
      .sort({_id: order})
      .then( books => {
        res.status(200).send(books)
      })
      .catch(e => {
        if (e) res.status(400).send(e);
      });
});

router.post('/', (req, res) => {
  const {name, author, review, pages, rating, price, ownerID} = req.body;

  new Book({name, author, review, pages, rating, price, ownerID})
      .save()
      .then(user => {
        res.status(200).json({
          post: true,
          bookId: user._id
        })
      })
      .catch(e => {
        res.status(400).send({post: false, ...e});
      });
});

router.put('/', (req, res) => {
  Book.findByIdAndUpdate(req.body._id, {$set: {...req.body}}, {new: true}, (err, book) => {
    if (err) return res.status(400).send(err);
    res.json({
      sccess: true,
        ... book._doc
    });
  })
});

router.delete('/', (req, res) => {
  let id = req.query.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  })
});

module.exports = router;