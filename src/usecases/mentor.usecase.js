const Mentor = require('../models/mentor.model.js');

const list = () => {
  const mentors = Mentor.find();
  return mentors;
};

const create = (data) => {
  const mentor = Mentor.create(data);
  return mentor;
};

const get = (id) => {
  const mentor = Mentor.findById(id).exec();
  return mentor;
};

const remove = (id) => {
  const mentor = Mentor.findByIdAndDelete(id);
  return mentor;
};

const modify = (id, body) => {
  const mentor = Mentor.findByIdAndUpdate(id, body, {
    returnDocument: 'after'
  });
  return mentor;
};

module.exports = { create, list, get, remove, modify };
