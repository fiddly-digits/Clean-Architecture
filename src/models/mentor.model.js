const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
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
  generations: [
    {
      name: {
        type: String,
        required: true
      },
      isActive: {
        type: Boolean,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Mentors', mentorSchema, 'Mentors');
