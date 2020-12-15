const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 8
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', schema)