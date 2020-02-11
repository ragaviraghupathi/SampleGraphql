const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = new Schema({
    name: String,
age:Number,
}, {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  });
module.exports = mongoose.model('Author', authorSchema);