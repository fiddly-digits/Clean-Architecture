const mongoose = require('mongoose');

/**
 * 1. Schema de Mongoose
 * 2. Modelo
 * **/

const koderSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  generation: {
    type: String
  },
  module: {
    type: String
  },
  sex: {
    type: String,
    enum: ['f', 'm', 'o']
  }
});

module.exports = mongoose.model('Koders', koderSchema, 'Koders');
