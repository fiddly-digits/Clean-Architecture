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

const modify = async (id, body) => {
  const mentorToModify = await Mentor.findById(id);

  if (body?.generations) {
    if (body.generations[0].isActive === true) {
      for (generation in mentorToModify.generations) {
        mentorToModify.generations[generation].isActive = false;
        body.generations.unshift(mentorToModify.generations[generation]);
      }
    } else {
      for (generation in mentorToModify.generations) {
        body.generations.unshift(mentorToModify.generations[generation]);
      }
    }
  }
  const mentor = Mentor.findByIdAndUpdate(id, body, {
    returnDocument: 'after'
  });
  return mentor;
};

module.exports = { create, list, get, remove, modify };
