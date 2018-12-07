const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  review: {
    type: String,
    default: 'non available'
  },
  pages: {
    type: String,
    default: 'non available'
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  price: {
    type: String,
    default: 'non available'
  },
  ownerID: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;