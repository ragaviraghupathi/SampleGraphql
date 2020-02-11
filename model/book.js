const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: String,
    authorId: String,
    genre:String
}, {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  });
module.exports = mongoose.model('Book', bookSchema);